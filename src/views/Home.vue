<template>
  <div v-if="route.name === 'home'">

    <Tip id="guacamole">
      <strong>Holy guacamole!</strong> You should hide this tip because it's not important.
    </Tip>

    <PageHeading heading="Home Page">
      <template #text>
        This is a starter page for an application. It's located at <code>src/views/Home.vue</code>.
      </template>
    </PageHeading>


    <h4>Welcome to Backstack!</h4>

    <p>
      <ExternalLink href="https://backstack.com" text="Backstack" /> is a server-side platform that
      provides a
      complete set of tools to manage
      your applications. It's designed to be flexible and scalable, allowing you to build applications that meet your
      unique requirements.
    </p>

    <p>This starter application is built with
      <ExternalLink href="https://vuejs.org" text="Vue 3" /> and
      <ExternalLink href="https://vitejs.dev" text="Vite" />. It includes custom components and views
      that interact with the Backstack API to achieve some innovative results. It's is available on
      <ExternalLink href="https://github.com/deloachtech/backstack-vue" text="GitHub" /> completely free for any usage
      under the MIT license.
    </p>

    <div v-if="session.demo" class="mt-5">

      <h4>API Access</h4>

      <p>You're accessing the API using <code>demo</code> as your app key. The
        demo is interactive, allowing you to submit changes and observe the effects on the associated pages. It
        resets to the default state with each new login. (Log in with <code>demo</code> as the username and password.)
      </p>

      <p>Head over to
        <ExternalLink href="https://dash.backstack.com" text="dash.backstack.com" />
        when you're ready to go live. All you have to do is update your app key and you're good to go.
      </p>
    </div>


    <h4 class="mt-5">Current Session</h4>
    
    <p>This data is dynamically provided by the Backstack API upon each page request in
      <code>src/router.js</code>. The session is a
      <ExternalLink href="https://pinia.vuejs.org" text="Pinia store" /> located at <code>src/session.js</code>.
    </p>

    <pre class="opacity-50">{{ session }}</pre>
  </div>
</template>

<script setup>
import { PageHeading, ExternalLink, Tip } from "@/components";
import { useRoute } from "vue-router";
import { useSession } from "@/session";

const route = useRoute();
const session = useSession();
</script>
