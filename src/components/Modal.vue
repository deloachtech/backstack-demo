<script setup>
import { onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";

const emit = defineEmits(["submit", "cancel"]);

const modalRef_xyh3476fcif63ife8 = ref(null);

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
  item: {
    type: Object,
    required: true,
    default: {},
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  heading: {
    type: String,
    required: false,
    default: "Update Value",
  },
  static: {
    type: Boolean,
    required: false,
    default: true,
  },
  backdrop: {
    type: [Boolean, String],
    required: false,
    default: "static",
  },
  keyboard: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const openModal = () => {
  const modalElement = modalRef_xyh3476fcif63ife8.value;
  if (modalElement) {
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
  }
};

onMounted(() => {
  modalRef_xyh3476fcif63ife8.value = document.getElementById("modalId-xyh3476fcif63ife8");
  if (modalRef_xyh3476fcif63ife8.value) {
    new Modal(modalRef_xyh3476fcif63ife8.value);
  }
});

const closeModal = () => {
  const modalElement = modalRef_xyh3476fcif63ife8.value;
  if (modalElement) {
    const modalInstance = Modal.getInstance(modalElement);
    modalInstance.hide();
  }
};

watch(() => props.open, (value) => {
  if (value) {
    openModal();
  } else {
    closeModal();
  }
});

</script>

<template>
  <div ref="modalRef_xyh3476fcif63ife8" class="modal fade" id="modalId-xyh3476fcif63ife8" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ heading }}</h1>
          <button @click.prevent="emit('cancel', item)" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <slot name="default">


            </slot>
          </div>
        </div>
        <div class="modal-footer">
          <button @click.prevent="emit('cancel', item)" type="button" class="btn btn-secondary" >Cancel</button>
          <button v-if="loading" type="button" disabled class="btn btn-primary"><span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Submit</button>
          <button v-else type="submit" @click.prevent="emit('submit', item)" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
