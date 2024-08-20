<template>

  <PageHeading heading="Home Page">
    <template #text>
      This is a starter page for an application. It's located at <code>src/views/Home.vue</code>.
    </template>
  </PageHeading>


  <h4>Sample Application</h4>

  <p>
    This is a great starting point for your Vue 3 application using the
    <ExternalLink href="https://backstack.com" text="Backstack" /> API. It's available on
    <ExternalLink href="https://github.com/deloachtech/backstack-vue" text="GitHub" /> completely free for any usage
    under the MIT license.
  </p>

  <div v-if="session.demo">

    <p>The project makes requests to the API using <code>demo</code> as the app key. The demo resets to the default
      state
      with each new login. (Log in with <code>demo</code> as the username and password.) Head over to
      <ExternalLink href="https://dash.backstack.com" text="dash.backstack.com" />
      when you're ready to go live. All you have to do is update the app key and you're good to go.
    </p>
  </div>

</template>

<script setup>
import { PageHeading, ExternalLink, Tip } from "@/components";
import { useSession } from "@/session";

const session = useSession();

</script>
