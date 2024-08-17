<!--
Bootstrap modal component with a spinner and transition effect.
The Bootstrap modal is horrible to work with. This component replaces the Bootstrap modal with a Vue component that is easier to work with.
-->
<template>
  <Transition name="_modal">
    <div v-if="open" class="modal-container modal-component">
      <div class="modal-backdrop"></div>
      <div class="modal show" tabindex="-1" aria-labelledby="modalLabel" style="display: block">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header d-flex align-items-start">
              <div>
                <div class="modal-title fs-5" id="modalLabel" v-html="heading"></div>
                <div v-if="subtext" class="text-secondary small">{{ subtext }}</div>
              </div>

              <button type="button" class="btn-close" @click="emit('cancel')" aria-label="Close"></button>

            </div>
            <div class="modal-body">
              <div :class="[loading ? 'spinner-container' : 'mb-3']">
                <div v-if="loading" class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <slot v-else></slot>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="emit('cancel')" class="btn btn-secondary">{{ cancelButtonText }}</button>

              <div v-if="!hideSubmitButton">
                <button v-if="submitting" type="button" disabled class="btn btn-primary"><span
                    class="spinner-border spinner-border-sm" aria-hidden="true"></span> {{ submitButtonText
                  }}</button>
                <button v-else-if="loading" type="button" disabled class="btn btn-primary">{{ submitButtonText
                  }}</button>
                <button v-else type="button" @click="emit('submit')" class="btn btn-primary">{{ submitButtonText
                  }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  submitting: { type: Boolean, required: false, default: false },
  loading: { type: Boolean, required: false, default: false },
  heading: { type: String, default: "heading" },
  subtext: String,
  cancelButtonText: { type: String, default: "Cancel" },
  submitButtonText: { type: String, default: "Submit" },
  hideSubmitButton: { type: Boolean, default: false },
});

const emit = defineEmits(["cancel", "submit"]);

const toggleBodyClass = (isOpen) => {
  if (isOpen) {
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden"; // Prevent body scrolling
  } else {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = ""; // Restore body scrolling
  }
};

watch(() => props.open, toggleBodyClass);

onMounted(() => {
  toggleBodyClass(props.open);
});

onUnmounted(() => {
  document.body.classList.remove("modal-open");
  document.body.style.overflow = ""; // Restore body scrolling
});
</script>


<style scoped>
._modal-enter-active,
._modal-leave-active {
  transition: opacity 0.5s ease;
}

._modal-enter-from,
._modal-leave-to {
  opacity: 0;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  /* 1/4 of the screen height */
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1040;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Transparent dark background */
  z-index: 1040;
  /* Ensure it covers the entire screen */
}

.modal {
  z-index: 1050;
  /* Ensure it is above the backdrop */
  position: relative;
  /* Ensure it is positioned correctly within the container */
}
</style>

<style>
.modal-open {
  overflow: hidden;
  /* Prevent body scrolling */
}
</style>
