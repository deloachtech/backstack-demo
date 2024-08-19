<template>
  <div v-if="route.name === 'home'">

    <PageHeading heading="Home Page">
      <template #text>
        This is a starter page for an application. It's located at <code>src/views/Home.vue</code>.
      </template>
    </PageHeading>

    <Tip id="guacamole" class="mb-5">
      <strong>Holy guacamole!</strong> You should hide this tip because it's not important.
    </Tip>

    <h4>Sample Codebase</h4>

    <p>
      This sample application is a great starting point for your Vue 3 application using the
      <ExternalLink href="https://backstack.com" text="Backstack" /> API. It's available on
      <ExternalLink href="https://github.com/deloachtech/backstack-vue" text="GitHub" /> completely free for any usage
      under the MIT license.
    </p>

    <div v-if="session.demo">

      <p>You're accessing the API using <code>demo</code> as your app key. The demo resets to the default state with each new login. (Log in with <code>demo</code> as the username and password.)
        Head over to
        <ExternalLink href="https://dash.backstack.com" text="dash.backstack.com" />
        when you're ready to go live. All you have to do is update your app key and you're good to go.
      </p>
    </div>

  </div>
</template>

<script setup>
import { PageHeading, ExternalLink, Tip } from "@/components";
import { useRoute } from "vue-router";
import { useSession } from "@/session";

const route = useRoute();
const session = useSession();

</script>
