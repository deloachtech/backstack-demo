<template>
  <Modal :open="open" heading="Add Credit Card" :loading="loading" :submitting="submitting" @submit="submit"
    @cancel="cancel">
    <div class="row gy-4 form">
      <div class="col-12">
        <label for="cc-number" class="form-label">Card number</label>
        <div id="cc-number" class="form-control"></div>
      </div>
      <div class="col-6">
        <label for="cc-expiration" class="form-label">Expiration</label>
        <div id="cc-expiration" class="form-control"></div>
      </div>
      <div class="col-6">
        <label for="cc-cvc" class="form-label">CVC</label>
        <div id="cc-cvc" class="form-control"></div>
      </div>
    </div>
    <div class="form-check mt-4">
      <input v-model="_default" class="form-check-input" type="checkbox" id="default" />
      <label class="form-check-label" for="default"> This is my default payment method. </label>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { Modal } from "@/components";
import { loadStripeJs } from "@/utils";
import { useSession } from "@/session";

const session = useSession();

const emit = defineEmits(["cancel", "success"]);

const props = defineProps({
  open: { type: Boolean, default: false },
});

const submitting = ref(false);
const errors = ref({});
const cardNumber = ref(null);
const cardExpiry = ref(null);
const cardCvc = ref(null);
const stripe = ref(null);
const _default = ref(false);
const loading = ref(true);

// const initializeStripeElements = async () => {
//   try {
//     // https://docs.stripe.com/js/appendix/style
//     var styles = {
//       base: {
//         iconColor: "#c4f0ff",
//         color: "#dee2e6", // <= this needs to be --bs--body-color
//         fontWeight: "400",
//         fontSize: "16px", // <= this needs to be --bs--font-size-base. Must be in px (see stripe docs)
//       },
//       invalid: {
//         // iconColor: "#FFC7EE",
//         // color: "#FFC7EE",
//       },
//     };
//     await loadStripeJs();

//     stripe.value = Stripe(session.app.stripe_pub_key);
//     const elements = stripe.value.elements();

//     await nextTick(); // Wait for the DOM to be updated

//     cardNumber.value = elements.create("cardNumber", { style: styles, placeholder: "XXXX XXXX XXXX XXXX" });
//     cardNumber.value.mount("#cc-number");
//     cardExpiry.value = elements.create("cardExpiry", { style: styles, placeholder: "MM/YY" });
//     cardExpiry.value.mount("#cc-expiration");
//     cardCvc.value = elements.create("cardCvc", { style: styles, placeholder: "XXX" });
//     cardCvc.value.mount("#cc-cvc");

//     loading.value = false; // Set loading to false after elements are mounted
//   } catch (error) {
//     console.error("Error initializing Stripe elements:", error);
//     loading.value = false;
//   }
// };

// watch(
//   () => props.open,
//   async (newVal) => {
//     if (newVal) {
//       loading.value = true; // Show loading indicator when modal is opened
//       //await nextTick(); // Ensure the DOM is updated before initializing Stripe elements
//       await initializeStripeElements();
//     }
//   }
// );

// onMounted(async () => {
//   if (props.open) {
//     loading.value = true; // Show loading indicator when component is mounted
//     //await nextTick(); // Ensure the DOM is updated before initializing Stripe elements
//     await initializeStripeElements();
//   }
// });

onMounted(async () => {
  if (props.open) {
    loading.value = true;

    try {
      // https://docs.stripe.com/js/appendix/style
      var styles = {
        base: {
          iconColor: "#c4f0ff",
          color: "#dee2e6", // <= this needs to be --bs--body-color
          fontWeight: "400",
          fontSize: "16px", // <= this needs to be --bs--font-size-base. Must be in px (see stripe docs)
        },
        invalid: {
          // iconColor: "#FFC7EE",
          // color: "#FFC7EE",
        },
      };

      await loadStripeJs();

      stripe.value = Stripe(session.app.stripe_pub_key);
      const elements = stripe.value.elements();

      await nextTick();

      cardNumber.value = elements.create("cardNumber", { style: styles, placeholder: "XXXX XXXX XXXX XXXX" });
      cardNumber.value.mount("#cc-number");
      cardExpiry.value = elements.create("cardExpiry", { style: styles, placeholder: "MM/YY" });
      cardExpiry.value.mount("#cc-expiration");
      cardCvc.value = elements.create("cardCvc", { style: styles, placeholder: "XXX" });
      cardCvc.value.mount("#cc-cvc");
      loading.value = false;
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  }
});

const submit = async () => {
  try {
    submitting.value = true;
    const { token, error } = await stripe.value.createToken(cardNumber.value);
    if (error) {
      console.error(error);
      // Handle error
    } else {
      await axios
        .post("https://api.backstack.com/v1/account/payment-methods/create", { token: token, default: _default.value }, { api: "backstack" })
        .then((response) => emit("success", response.data))
        .catch((error) => console.error(error))
        .finally(() => submitting.value = false);
    }
  } catch (error) {
    submitting.value = false;
    console.error(error);
  }
};

const cancel = () => {
  cardCvc.value = null;
  cardExpiry.value = null;
  cardNumber.value = null;
  emit("cancel");
};
</script>

<style scoped>
.StripeElement--focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
