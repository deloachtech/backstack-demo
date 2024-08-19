<template>


  <p>Statistical data is sourced from transactions performed by this application. For the most accurate information, please refer to your Stripe dashboard, as some transactions may not have been captured by this application.</p>


  <Spinner v-if="fetching" />

  <div class="row mt-5 g-5">
    <div class="col chart-container">
      <LineChart title="Revenue" :labels="Object.keys(revenue)" :values="Object.values(revenue)" />
    </div>
    <div class="col chart-container">
      <BarChart title="New Customers" :labels="Object.keys(customers)" :values="Object.values(customers)" />
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Spinner, LineChart, BarChart } from "@/components";

const customers = ref([]);

const revenue = ref([]);

const fetching = ref(false);

const fetch = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/stripe/stats", { api: "backstack" })
    .then((response) => {
      customers.value = response.data.customers || [];
      revenue.value = response.data.revenue || [];
    })
    .finally(() => fetching.value = false);
};



//fetch();
onMounted(async () => {
  await fetch();
  //initializeChart();
});
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 40vh;
  /* width: 80vw; */
}
</style>