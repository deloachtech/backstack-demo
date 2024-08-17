<template>
  <div class="dropdown action-dropdown-component">
    <button class="btn dropdown-toggle dropdown-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
        class="bi bi-three-dots action-dropdown-component-icon"></i></button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li v-for="action in actions" :key="action.key">
        <a v-if="action.disabled" class="dropdown-item disabled" href="javascript:void(0)">{{ action.text }}</a>
        <a v-else @click.prevent="emit('action', {
          key: action.key,
          data: props?.data
        })" class="dropdown-item" href="javascript:void(0)">{{
          action.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>

const emit = defineEmits(["action"]);

const props = defineProps({
  data:{default: null},
  actions: Array,
});

</script>
