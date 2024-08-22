<template>

  <PageHeading heading="Example Tip">
    <template #text>
      This is an example of a tip that can be hidden by the user.
    </template>
  </PageHeading>

  <Tip id="guacamole" class="mb-5">
    <strong>Holy guacamole!</strong> You should hide this tip because it's not important.
  </Tip>

  <p>Set a tip on a page using <code>src/components/Tip.vue</code>. Hidden <router-link
      to="/reset-tips">tips can be reset</router-link> via a user
    option using <code>src/views/user/ResetTips.vue</code>.</p>


</template>

<script setup>
import { PageHeading, Tip } from "@/components";

</script>
