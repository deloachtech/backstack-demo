<template>
  <Modal :open="open" @cancel="cancel" @submit="submit" :submitting="submitting" heading="Confirm Delete" submitButtonText="Delete"> Are you sure you want to delete this payment method? This action cannot be undone. </Modal>
</template>

<script setup>
import { ref } from "vue";
import { Modal } from "@/components";
import axios from "axios";

const props = defineProps({
  open: { type: Boolean, required: true },
  cardId: String,
});

const emit = defineEmits(["cancel", "success"]);

const submitting = ref(false);

const submit = async () => {
  submitting.value = true;

  await axios
    .delete(`https://api.backstack.com/v1/account/payment-methods/${props.cardId}`, { api: "backstack" })
    .then((response) => {
      // Returns an updated card list
      emit("success", response.data);
    })
    .finally(() => {
      submitting.value = false;
    });
};

const cancel = () => {
  emit("cancel");
};
</script>

<style scoped></style>
