<script setup>
import { ref } from "vue";
import axios from "axios";
import { PageHeading, Button, FormInput, Toast } from "@/components";

const submitting = ref(false);
const errors = ref({});
const data = ref({
  password: "",
  confirm_password: "",
});

const showToast = ref(false);


const changePassword = async () => {

  errors.value = {};

  // Do some basic validation. The API does more and will return an error if the data is invalid.

  if (!data.value.password) {
    errors.value.password = "Password required";
  }
  if (!data.value.confirm_password) {
    errors.value.confirm_password = "Password confirmation required";
  }
  if (data.value.password && data.value.confirm_password && data.value.password !== data.value.confirm_password) {
    errors.value.confirm_password = "Passwords do not match";
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  submitting.value = true;

  await axios
      .post("https://api.backstack.com/user/change-password", data.value, { api: "backstack" })
      .catch((error) => errors.value = error.fields)
      .then((response) => {
        showToast.value = true;
        data.value = { password: "", confirm_password: "" };
      })
      .finally(() => submitting.value = false);
};
</script>

<template>

  <Toast :open="showToast" message="Password updated successfully" />

  <PageHeading heading="Change Password">
    <template #text>
      Update your password to keep your account secure.
    </template>
  </PageHeading>


  <div class="row mb-3">
    <label for="password" class="col-sm-2 col-form-label">New password</label>
    <div class="col-sm-4">
      <FormInput v-model="data.password" :error="errors.password" type="password" id="password"
        help="Must be at least 8 characters long and cannot be your username." />
    </div>
  </div>

  <div class="row mb-3">
    <label for="confirm_password" class="col-sm-2 col-form-label">Confirm new password</label>
    <div class="col-sm-4">
      <FormInput v-model="data.confirm_password" :error="errors.confirm_password" type="password"
        id="confirm_password" />
    </div>
  </div>

  <Button @click="changePassword()" :submitting="submitting">Update</Button>


</template>

