<template>
  <PageHeading heading="Payment Methods" as-subheading>
    <template #text> Your current payment methods. </template>
    <template #actions>
      <button v-if="session.hasAccess($access.ACCOUNT_PAYMENT_METHODS_MANAGE)" type="button" @click="addCard = true" class="btn btn-primary">Add</button>
    </template>
  </PageHeading>

  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <div v-if="cards?.length === 0" class="alert alert-info">You haven't provided any payment methods.</div>
    <div v-else>
      <div class="row g-5">
        <div v-for="card in cards" class="col">
          <div :class="[card.default ? 'text-bg-primary' : 'text-bg-secondary', 'card']" style="width: 15rem" :key="`card-${card.id}`">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>{{ card.brand }}</div>

              <div class="dropdown">
                <button class="btn btn-sm" type="button" :id="card.id" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-three-dots"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" :aria-labelledby="card.id">
                  <li><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'update', id: card.id })">Update</a></li>
                  <li v-if="!card.default"><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'make-default', id: card.id })">Make default</a></li>
                  <li><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'delete', id: card.id })">Delete</a></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div>**** **** **** {{ card.last4 }}</div>
              <div>Expires {{ card.exp_month }}/{{ card.exp_year }}</div>
            </div>

            <Spinner v-if="showSpinnerForCard === card.id" overlay />
          </div>
        </div>
      </div>
    </div>
  </div>

  <AddModal :open="addCard" @cancel="addCard = false" @success="handleAddCardSuccess" />
  <ConfirmDeleteModal :open="confirmDelete" :cardId="confirmDeleteCardId" @cancel="confirmDelete = false" @success="handleDeleteCardSuccess" />
  <UpdateModal :open="updateCard" :card="updateCardCard" @cancel="updateCard = false" @success="handleUpdateCardSuccess" />
</template>

<script setup>
import { PageHeading } from "backstack-vue-assets";
import axios from "axios";
import { ref } from "vue";
import AddModal from "./AddModal.vue";
import ConfirmDeleteModal from "./ConfirmDeleteModal.vue";
import UpdateModal from "./UpdateModal.vue";
import { useSession } from "backstack-vue-assets/stores/session.js";
import { Spinner } from "@/components";

const session = useSession();
const fetching = ref(false);
const cards = ref({});
const showSpinnerForCard = ref(null);
const confirmDelete = ref(false);
const confirmDeleteCardId = ref(null);
const addCard = ref(false);
const updateCard = ref(false);
const updateCardCard = ref({});

const fetchCards = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/payment-methods", { api: "backstack" })
    .then((response) => {
      cards.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
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
    .then((response) => {
      // Returns an updated card list
      cards.value = response.data;
    })
    .finally(() => {
      showSpinnerForCard.value = null;
    });
};
</script>

<style scoped></style>
