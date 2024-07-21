<template>
  
  <div v-if="fetching" class="d-flex justify-content-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <div v-if="data.length === 0" class="alert alert-info">There are no optional modules are available at this time. Contact support if you'd like one created for your specific requirements.</div>

    <div v-else class="bva-optional-features mb-5">
      <div :class="[data.length === 0 ? 'row-cols-1' : 'row-cols-1 row-cols-lg-3', 'row g-5']">
        <div v-for="record in data" :key="record.feature_id" class="col d-flex align-items-start">
          <div :class="['icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3', { 'semi-transparent': activateModuleId === record.id }]">
            <!-- This project stores a bootstrap icon (e.g. <i class="bi bi-exclamation-circle"></i>) string as the feature.image. -->
            <span v-if="record.image" v-html="record.image"></span>
          </div>
          <div class="position-relative">
            <div :class="{ 'semi-transparent': activateModuleId === record.id }">
              <!-- Added position-relative class -->
              <div class="d-flex justify-content-between align-items-center semi-transparent2">
                <div class="fs-3 text-body-emphasis">{{ record.title }}</div>
                <div class="dropdown">
                  <button class="btn btn-sm" type="button" :id="record.id" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-gear fs-4"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" :aria-labelledby="record.id">
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'more-info', record: record })">More info</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'settings', record: record })">Settings</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li v-if="record.active"><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'deactivate', record: record })">Deactivate</a></li>
                    <li v-else><a class="dropdown-item" href="javascript:void(0)" @click="handleOptionClick({ key: 'activate', record: record })">Activate</a></li>
                  </ul>
                </div>
              </div>

              <span v-if="record.active" class="badge text-bg-success semi-transparent2">Active</span>
              <span v-else class="badge text-bg-secondary semi-transparent2">Inactive</span>
              <p class="text-secondary mt-2" v-if="record.description">{{ record.description }}</p>
            </div>

            <div v-if="activateModuleId === record.id" class="overlay-spinner">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal :open="modal" @cancel="modal = false" @submit="" :submitting="submitting" cancel-label="Close" :submit-label="modalSubmitLabel" :heading="(record.image ? record.image + ' &nbsp;' : '') + record.title">
    <div class="text-body-secondary">{{ record.description }}</div>
    <div class="mt-3 mb-3">Fee: ${{ record?.fee || 0 / 100 }}<small class="text-body-secondary fw-light">/mo</small></div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import {  Modal } from "backstack-vue-assets";
import axios from "axios";
import { useSession } from "backstack-vue-assets/stores/session.js";

const session = useSession();
const fetching = ref(false);
const data = ref({});
const view = ref("modules");  

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/optional-features", { api: "backstack" })
    .then((response) => {
      data.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();

const modal = ref(false);
const record = ref({});
const submitting = ref(false);
const modalSubmitLabel = ref("Activate");
const activateModuleId = ref(null);

const toggleActivation = async () => {
  submitting.value = true;
  await axios
    .post(`https://api.backstack.com/v1/account/optional-features/${activateModuleId.value}`, null, { api: "backstack" })
    .then((response) => {
      data.value = data.value.map((item) => {
        if (item.id === activateModuleId.value) {
          item.active = response.data.active;
        }
        return item;
      });
    })
    .finally(() => {
      submitting.value = false;
      activateModuleId.value = null;
    });
};

const handleOptionClick = (option) => {
  if (option.key === "more-info") {
  } else if (option.key === "activate" || option.key === "deactivate") {
    activateModuleId.value = option.record.id;
    toggleActivation();
  } else if (option.key === "settings") {
    record.value = option.record;
    modal.value = true;
  }
};
</script>

<style scoped>
.icon-square.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.icon-square {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
}

.position-relative {
  position: relative;
}

.semi-transparent {
  opacity: 0.3;
}

.overlay-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>
