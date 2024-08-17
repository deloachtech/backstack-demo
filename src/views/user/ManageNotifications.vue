<template>
  <PageHeading heading="Manage Notifications">
    <template #text> Manage how you receive notifications. </template>
  </PageHeading>

  <Spinner v-if="fetchingSettings" />
  <div v-else>
    <div v-if="settings.length === 0">
      <div class="alert alert-info">Currently, there aren't any notification settings available for your account. Please
        check
        again later.</div>
    </div>
    <div v-else class="mb-5">

      <PageHeading heading="Your contact information" as-subheading>
        <template #text> Your contact information is used to send you notifications. These are the current
          settings.
        </template>
      </PageHeading>

      <div class="row mb-3">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-4">
          <input v-model="user.email" type="email" class="form-control" id="inputEmail" />
        </div>
      </div>

      <div class="row mb-3">
        <label for="inputMobileNumber" class="col-sm-2 col-form-label">Mobile number</label>
        <div class="col-sm-4">
          <input v-model="user.mobile_number" type="text" class="form-control" id="inputMobileNumber" />
        </div>
      </div>

      <Button @click="updateUser()" :submitting="updatingUser">Update</Button>


      <hr class="mt-5" />


      <PageHeading heading="Notification preferences" as-subheading>
        <template #text>
          Notifications are sent to you based on your preferences.
        </template>
        <template #actions>

        </template>
      </PageHeading>

      <div v-for="setting in settings" :key="setting.id" class="d-flex flex-column flex-md-row mb-5">

        <div class="flex-grow-1">
          <h5>{{ setting.title }}</h5>
          <p class="mb-0 opacity-50">{{ setting.description }}</p>
        </div>

        <div class="d-block d-md-inline-block mt-3 mt-md-0">
          <div class="btn-group" role="group" aria-label="checkbox toggle button group">

            <input type="checkbox" class="btn-check" :id="`btnApp-${setting.id}`" v-model="setting.app"
              autocomplete="off" />
            <label class="btn btn-outline-primary" :for="`btnApp-${setting.id}`">App</label>

            <input type="checkbox" class="btn-check" :id="`btnEmail-${setting.id}`" v-model="setting.email"
              autocomplete="off" />
            <label class="btn btn-outline-primary" :for="`btnEmail-${setting.id}`">Email</label>

            <input type="checkbox" class="btn-check" :id="`btnText-${setting.id}`" v-model="setting.text"
              autocomplete="off" />
            <label class="btn btn-outline-primary" :for="`btnText-${setting.id}`">Text</label>

          </div>
        </div>
      </div>

      <Button @click="updateSettings()" :submitting="updatingSettings">Update</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Spinner, PageHeading, Button } from "@/components";
import { useSession } from "@/session";
import axios from "axios";
import { validateEmail } from "@/utils";

const session = useSession();
const fetchingSettings = ref(false);
const updatingUser = ref(false);
const updatingSettings = ref(false);
const errors = ref({});


const user = ref({
  email: session.user.email,
  mobile_number: session.user.mobile_number,
});


const settings = ref([]);

const fetchSettings = async () => {
  fetchingSettings.value = true;

  await axios
    .get("https://api.backstack.com/v1/user/notification-settings", { api: "backstack" })
    .then((response) =>settings.value = response.data)
    .finally(() => fetchingSettings.value = false);
};

fetchSettings();


const updateUser = async () => {

  errors.value = {};

  if (!user.value.email) {
    errors.value.email = "Email required";
  }else if (!validateEmail(user.value.email)) {
    errors.value.email = "Invalid email address";
  }

  if(Object.keys(errors.value).length > 0) {
    return;
  }

  updatingUser.value = true;
  
  await axios
    .post("https://api.backstack.com/v1/user", user.value, { api: "backstack" })
    .then((response) => {
      session.user.email = user.value.email;
      session.user.mobile_number = user.value.mobile_number;
    })
    .catch((error) => errors.value = error.fields)
    .finally(() => updatingUser.value = false);
};

const updateSettings = async () => {

  updatingSettings.value = true;

  await axios
    .post("https://api.backstack.com/v1/user/notification-settings", {

      // Filter settings to include only id, app, email, and text keys
      settings: settings.value.map(setting => ({
        id: setting.id,
        app: setting.app,
        email: setting.email,
        text: setting.text
      })
      )
    }, { api: "backstack" })
    .then((response) => settings.value = response.data) 
    .finally(() => updatingSettings.value = false);
};

</script>
