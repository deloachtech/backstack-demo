<!-- This component is not ready. -->
 <template>
  <Transition name="_modal">
    <div v-if="open" class="modal-container offcanvas-component">
      <div class="modal-backdrop"></div>
      <div class="offcanvas offcanvas-end show" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">{{ heading }}</h5>
          <button type="button" class="btn-close" @click="emit('cancel')" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
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
          <button type="button" @click="emit('cancel')" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const emit = defineEmits(["cancel"]);

const props = defineProps({
  open: { type: Boolean, default: false },
  loading: { type: Boolean, required: false, default: false },
  heading: { type: String, default: "heading" },
});

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
  height: 25vh; /* 1/4 of the screen height */
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
  background-color: rgba(0, 0, 0, 0.5); /* Transparent dark background */
  z-index: 1040; /* Ensure it covers the entire screen */
}

.modal {
  z-index: 1050; /* Ensure it is above the backdrop */
  position: relative; /* Ensure it is positioned correctly within the container */
}
</style>

<style>
.modal-open {
  overflow: hidden; /* Prevent body scrolling */
}
</style>
