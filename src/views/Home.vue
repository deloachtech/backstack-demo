<script setup>
import { PageHeading, ExternalLink, Tip } from "@/components";
import { useSession } from "@/session";

const session = useSession();

</script>

<template>

  <PageHeading heading="Backstack Demo">
    <template #text>
      Use this codebase to kickstart your application development. It's available on
      <ExternalLink href="https://github.com/deloachtech/backstack-demo" text="GitHub" /> completely free for any usage
      under the MIT license.
    </template>
  </PageHeading>




  <p>This project accesses the live
    <ExternalLink href="https://api.backstack.com" text="Backstack API" /> using <code>demo</code> as the app key, username and password. It provides examples for usage with
    <ExternalLink href="https://vuejs.org" text="Vue 3" /> and is pre-configured with the necessary dependencies and settings to get you up and running quickly.
  </p>


</template>

