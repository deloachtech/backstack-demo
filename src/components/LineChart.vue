<template>
  <canvas v-if="hasData" :id="uniqueId"></canvas>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { v4 as uuidv4 } from "uuid";
import Chart from 'chart.js/auto';
import { colors, borderColors } from "@/template/chartColors";

const props = defineProps({
  title: String,
  labels: Array,
  values: Array,
});

const uniqueId = uuidv4();
let chartInstance = null;

const hasData = computed(() => props.labels.length > 0 && props.values.length > 0);

const initializeChart = () => {
  nextTick(() => {
    if (!hasData.value) {
      return;
    }

    if (chartInstance) {
      chartInstance.destroy();
    }

    const canvas = document.getElementById(uniqueId);
    if (canvas) {
      chartInstance = new Chart(canvas, {
        type: 'line',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              //min: 0,
              ticks: {
                //stepSize: 100
              }
            }
          }
        },
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.title,
              data: props.values,
              backgroundColor: colors.slice(0, props.values.length),
              borderColor: borderColors.slice(0, props.values.length),
              borderWidth: 1,
              tension: 0.1
            }
          ]
        }
      });
    }
  });
};

onMounted(initializeChart);

watch([() => props.labels, () => props.values], initializeChart);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>