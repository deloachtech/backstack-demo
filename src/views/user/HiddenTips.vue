<script setup>
import { ref } from "vue";
import axios from "axios";
import { PageHeading, Button } from "@/components";
import { useSession } from "@/session";

const session = useSession();
const submitting = ref(false);

const resetTips = async () => {
  submitting.value = true;
  await axios
      .post("https://api.backstack.com/user/unhide-tips", { hidden_tips: [] }, { api: "backstack" })
      .then((result) => session.user.hidden_tips = [])
      .finally(() => submitting.value = false);
};
</script>

<template>
  <PageHeading heading="Reset Hidden Tips">
    <template #text>
      Resetting the application hidden tips will restore all previously hidden tips back to their default visible
      state. This can be useful if you want to revisit the tips and guidance provided by the application.
      
    </template>
    <template #actions>
      <Button class="btn-outline-primary" :disabled="session.user.hidden_tips.length === 0" :submitting="submitting"
        @click="resetTips()">Reset Tips</Button>
    </template>
  </PageHeading>

  <div v-if="session.user.hidden_tips.length === 0" class="alert alert-info">You have no hidden tips.</div>
</template>


