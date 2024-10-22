<template>

  <Spinner v-if="loading" />

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSession } from "@/session";
import { useRouter } from "vue-router";
import axios from "axios";
import {Spinner} from "@/components"

const session = useSession();
const router = useRouter()
const loading = ref(false)

const logout = async () => {
  loading.value = true;
  await axios.get('https://api.backstack.com/app/logout', { api: 'backstack' })
    .then((response) => {
      session.update(response.data);
    })
    .finally(() => {
      loading.value = false;
      router.push('/login')
    })
}

onMounted(() => {
  logout();
});

</script>
