<script setup>
import { ref } from "vue";
import { Modal } from "@/components";
import axios from "axios";

const props = defineProps({
  open: { type: Boolean, required: true, default: false },
  record: { type: Object, required: true },
});

const emit = defineEmits(["cancel", "success"]);

const submitting = ref(false);

const submit = async () => {
  submitting.value = true;

  await axios
      .delete(`https://api.backstack.com/account/network-accounts/${props.record.account_id}`, { api: "backstack" })
      .then((response) => emit("success", response.account_id))
      .finally(() => submitting.value = false);
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <Modal :open="open" @cancel="cancel" @submit="submit" :submitting="submitting" heading="Confirm Delete"
    submitButtonText="Delete"> Are you sure you want to delete the {{ record.account_title }} network? This action
    cannot be undone.</Modal>
</template>


