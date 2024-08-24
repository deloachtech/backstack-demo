<template>

  <PageHeading heading="Home Page">
    <template #text>
      This is a starter page for an application. It's located at <code>src/views/Home.vue</code>.
    </template>
  </PageHeading>


  <h4>Backstack API sample application</h4>


  <p>This sample application demonstrates how to use the <ExternalLink href="https://api.backstack.com" text="Backstack API" /> with <ExternalLink href="https://vuejs.org" text="Vue 3" />. It's available on
    <ExternalLink href="https://github.com/deloachtech/backstack-vue" text="GitHub" /> completely free for any usage
    under the MIT license.
  </p>

  <div class="alert alert-info"> The project uses <code>demo</code> as the app key, the log in username and password. (The demo
    resets to the default state with each new login.)
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
