<template>

  <PageHeading heading="Payment Methods" :as-subheading="route.name !== 'accountPaymentMethods'">

    <template #text>
      You can add, update, and delete your payment methods here. You can also make a payment method the default
      method for your account. The default payment method is used for all invoices unless you specify a different
      method.
    </template>

    <template #actions>
      <TableToolbar v-if="appCanProcessPaymentMethods && session.hasAccess('account-payment-methods:c')" hide-search
        hide-filters @add="addCard = true" />
    </template>
  </PageHeading>


  <Spinner v-if="fetching" />

  <div v-else>
    <div v-if="!appCanProcessPaymentMethods">
      <div class="alert alert-info">
        Processing payment methods is temporally unavailable. Please try again later.
      </div>
    </div>
    <div v-else-if="cards?.length === 0" class="alert alert-info">You haven't provided any payment methods.</div>
    <div v-else>
      <div class="row g-5">
        <div v-for="card in cards" class="col">
          <div
            :class="[card.default ? 'text-bg-primary' : (card.expired ? 'text-bg-danger' : 'text-bg-secondary'), 'card']"
            style="width: 15rem" :key="`card-${card.id}`">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>{{ card.brand }}</div>

              <div class="dropdown">
                <button class="btn btn-sm" type="button" :id="card.id" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" :aria-labelledby="card.id">
                  <li><a class="dropdown-item" href="javascript:void(0)"
                      @click="handleOptionClick({ key: 'update', id: card.id })">Update</a></li>
                  <li v-if="card.default">
                    <a class="dropdown-item disabled" aria-disabled="true"><i class="bi bi-check-lg"></i> Default</a>
                  </li>
                  <li v-else><a class="dropdown-item" href="javascript:void(0)"
                      @click="handleOptionClick({ key: 'make-default', id: card.id })">Make default</a></li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="javascript:void(0)"
                      @click="handleOptionClick({ key: 'delete', id: card.id })">Delete</a></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div>**** **** **** {{ card.last4 }}</div>
              <div>Expires {{ card.exp_month }}/{{ card.exp_year }}</div>
            </div>

            <Spinner v-if="showSpinnerForCard === card.id" class="spinner-overlay" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <AddPaymentMethod :open="addCard" @cancel="addCard = false" @success="handleAddCardSuccess" />
  <DeletePaymentMethod :open="confirmDelete" :cardId="confirmDeleteCardId" @cancel="confirmDelete = false"
    @success="handleDeleteCardSuccess" />
  <UpdatePaymentMethod :open="updateCard" :card="updateCardCard" @cancel="updateCard = false"
    @success="handleUpdateCardSuccess" />
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import AddPaymentMethod from "./AddPaymentMethod.vue";
import DeletePaymentMethod from "./DeletePaymentMethod.vue";
import UpdatePaymentMethod from "./UpdatePaymentMethod.vue";
import { useSession } from "@/session";
import { Spinner, PageHeading, TableToolbar } from "@/components";
import { useRoute } from "vue-router";

const session = useSession();
const fetching = ref(false);
const cards = ref({});
const showSpinnerForCard = ref(null);
const confirmDelete = ref(false);
const confirmDeleteCardId = ref(null);
const addCard = ref(false);
const updateCard = ref(false);
const updateCardCard = ref({});


const route = useRoute();

const appCanProcessPaymentMethods = (session.app.stripe_pub_key.length > 0 && session.app.stripe_key_exists === true);

const fetchCards = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/payment-methods", { api: "backstack" })
    .then((response) => cards.value = response.data)
    .finally(() => fetching.value = false);
};

fetchCards();

const handleAddCardSuccess = (resp) => {
  addCard.value = false;
  cards.value = resp;
};

const handleDeleteCardSuccess = (resp) => {
  confirmDelete.value = false;
  cards.value = resp;
};

const handleUpdateCardSuccess = (resp) => {
  updateCard.value = false;
  updateCardCard.value = {};
  cards.value = resp;
};

const handleOptionClick = (option) => {
  if (option.key === "delete") {
    confirmDelete.value = true;
    confirmDeleteCardId.value = option.id;
  } else if (option.key === "make-default") {
    makeDefault(option);
  } else if (option.key === "update") {
    updateCard.value = true;
    updateCardCard.value = cards.value.find((card) => card.id === option.id);
  }
};

const makeDefault = async (option) => {
  showSpinnerForCard.value = option.id;
  await axios
    .post(`https://api.backstack.com/v1/account/payment-methods/${option.id}/make-default`, null, { api: "backstack" })
    .then((response) => cards.value = response.data)
    .finally(() => showSpinnerForCard.value = null);
};
</script>


<style scoped>
.spinner-overlay {
  border-radius: 0.25rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
