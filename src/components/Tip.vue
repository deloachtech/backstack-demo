<template>
  <div v-if="!session.tipHidden(id)" class="d-flex w-100 p-3 tip-component">
    <div class="flex-grow-1">

      <i class="bi bi-exclamation-square-fill flex-shrink-0 me-2 tip-icon"></i>
      <slot></slot>

    </div>
    <div>
      <ActionDropdown :data="id" @action="action" :actions="[
        { key: 'close', text: 'Hide for now' },
        { key: 'hide', text: 'Hide forever' },
      ]" style="padding-left: 1.5rem;" class="tip-component-dropdown" />
    </div>
    <Spinner v-if="session.hidingTip" class="spinner-overlay" />
  </div>
</template>

<script setup>
import { ActionDropdown, Spinner } from "@/components";
import { useSession } from "@/session";

const session = useSession();

const props = defineProps({
  id: { type: String, default: "" },
});

const action = (action) => {
  if (action.key === 'close') {
    session.closeTip(props.id)
  } else if (action.key === 'hide') {
    session.hideTip(props.id);
  }
};

</script>

<style scoped>
.tip-component {
  border-width: 1px;
  border-radius: 8px;
  position: relative;
}

.spinner-overlay {
  position: absolute;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
</style>
