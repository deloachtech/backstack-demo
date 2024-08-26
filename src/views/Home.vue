<template>

  <PageHeading heading="Backstack Demo">
    <template #text>
      Use this codebase to kickstart your application development. It's available on
    <ExternalLink href="https://github.com/deloachtech/backstack-demo" text="GitHub" /> completely free for any usage
    under the MIT license.
    </template>
  </PageHeading>


  

  <p>This project provides examples for using the
    <ExternalLink href="https://api.backstack.com" text="Backstack API" /> with
    <ExternalLink href="https://vuejs.org" text="Vue 3" />.  It's a great starting point for building your own application. The project is pre-configured with the necessary
    dependencies and settings to get you up and running quickly.
  </p>

  <div class="alert alert-info mt-5"> Use <code>demo</code> as the app key, username and password.
    Head over to
    <ExternalLink href="https://dash.backstack.com" text="dash.backstack.com" />
    when you're ready to go live. All you have to do is update the app key and you're good to go.
  </div>

</template>

<script setup>
import { PageHeading, ExternalLink, Tip } from "@/components";
import { useSession } from "@/session";

const session = useSession();

</script>
