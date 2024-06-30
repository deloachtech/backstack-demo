<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const showAlert = ref(false);
const alertMessage = ref('');
const router = useRouter();

axios.interceptors.request.use(
  (config) => {


    showAlert.value = false;
    alertMessage.value = '';

    return config
  }
)

axios.interceptors.response.use(
  response => response,
  error => {

    if (error.response) {

      if (error.response.config.api === 'backstack') {

        if (error.response.data.error.type === 'user') {

          // It's a user error where the error.message is suitable for display.

          if (error.response.config.method.toLowerCase() !== 'delete') {

            // Bypass if there are fields in the error. (Let the form handle it.)
            if (error.response.data.error.fields.length === 0) {

              if (error.response.config.alert !== false) {
                alertMessage.value = error.response.data.error?.message || 'An error occurred. Please try again later.';
                showAlert.value = true;
              }
            }
          }

        } else {

          // It's a codebase or system error.

          if (process.env.NODE_ENV === 'development') {
            console.log(error);
          }
          if (error.response.status === 401) {
            //router.push('/login');
          } else if (error.response.status === 404) {
            //router.push('/path-to-404');

            if (error.response.config.alert !== false) {
              alertMessage.value = 'An error occurred. Please try again later.';
              showAlert.value = true;
            }
          } else {

            // 500 error?
            if (error.response.config.alert !== false) {
              alertMessage.value = 'An error occurred. Please try again later.';
              showAlert.value = true;
            }
          }
        }

      } else {
        // Handle other axios configurations here.
      }
    }
    return Promise.reject(error);
  }
);

function handleAlertClose() {
  showAlert.value = false;
}
</script>

<template>
  <div v-if="showAlert" class="alert alert-danger" role="alert">
    {{ alertMessage }}
  </div>
</template>


<style scoped></style>