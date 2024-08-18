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

    <h4>Welcome to Backstack!</h4>

    <p>
      <ExternalLink href="https://backstack.com" text="Backstack" /> is a backend-as-a-service (BaaS) providing a
      complete set of APIs for managing your application codebase.
      This sample application includes custom components and views
      that interact with the Backstack API to achieve some innovative results. It's available on
      <ExternalLink href="https://github.com/deloachtech/backstack-vue" text="GitHub" /> completely free for any usage
      under the MIT license.
    </p>

    <div v-if="session.demo">

      <p>You're accessing the API using <code>demo</code> as your app key. The
        demo is interactive, allowing you to submit changes and observe the effects on the associated pages. It
        resets to the default state with each new login. (Log in with <code>demo</code> as the username and password.)
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
