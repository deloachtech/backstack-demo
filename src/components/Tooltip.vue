<template>
  <div class="tooltip-container tooltip-component" ref="tooltipContainer">
    <slot></slot>
    <i v-if="tip" class="bi bi-info-circle" style="margin-left: 8px" @mouseenter="showTooltip" @mouseleave="hideTooltip"></i>
    <div v-if="visible" class="tooltip" ref="tooltipRef">{{ tip }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { createPopper } from "@popperjs/core";

const props = defineProps({
  tip: String,
});

const visible = ref(false);
const tooltipRef = ref(null);
const tooltipContainer = ref(null);
let popperInstance = null;

const showTooltip = () => {
  visible.value = true;
  if (tooltipRef.value && tooltipContainer.value) {
    popperInstance = createPopper(tooltipContainer.value, tooltipRef.value, {
      placement: "top",
    });
  }
};

const hideTooltip = () => {
  visible.value = false;
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
};

onMounted(() => {
  window.addEventListener("resize", hideTooltip);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", hideTooltip);
  if (popperInstance) {
    popperInstance.destroy();
  }
});
</script>


<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background-color: var(--bs-emphasis-color);
  color: var(--bs-body-bg);
  padding: 5px;
  border-radius: 8px;
  width: 200px;
  white-space: normal;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
  text-align: center;
}

.tooltip-container:hover .tooltip {
  opacity: 1;
}
</style>
