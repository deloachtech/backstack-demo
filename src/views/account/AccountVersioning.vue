<template>
  <PageHeading heading="Application Versions" as-subheading>
    <template #text> Versions provide extended functionality to meet the needs of your organization. </template>
  </PageHeading>

  <Spinner v-if="fetching" class="content-spinner" />

  <div v-else>
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="check" viewBox="0 0 16 16">
        <title>Check</title>
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </symbol>
    </svg>

    <!-- Display the versions available. -->

    <div :class="`row row-cols-sm-1 row-cols-md-${data.versions.length} mb-3 text-center bva-versioning`">
      <div v-for="version in data.versions" :key="version.id" class="col">
        <div :class="[version.active ? 'border-primary' : '', 'card mb-4 rounded-3 shadow-sm']">
          <div :class="[version.active ? 'text-bg-primary border-primary' : '', 'card-header py-3']">
            <h4 class="my-0 fw-normal">{{ version.title }}</h4>
          </div>
          <div class="card-body">
            <p v-if="version.description" class="text-secondary">{{ version.description }}</p>

            <h1 v-if="version.fee" class="card-title pricing-card-title">${{ version.fee / 100 }}<small class="text-body-secondary fw-light">/mo</small></h1>
            <h1 v-else class="card-title pricing-card-title">Free</h1>

            <!-- 
            The version.metadata provided in the Backstack dashboard is a pipe (|) delimited string.
            Adjust the logic below if you use a different delimiter or format. 
            -->
            <ul v-if="version.metadata" class="list-unstyled mt-3 mb-4">
              <li v-for="meta in version.metadata.split('|')">{{ meta }}</li>
            </ul>

            <button v-if="version.active" type="button" class="w-100 btn btn-lg btn-outline-secondary" disabled>Active</button>
            <button v-else type="button" class="w-100 btn btn-lg btn-outline-info">Info</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Display the matrix of features. -->

    <div v-if="data.matrix">
      <h2 class="display-6 text-center mb-4">Compare features</h2>

      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th v-for="(heading, index) in data.matrix.headings" :key="heading" :style="index === 0 ? 'width: 50%;' : `width: ${50 / (data.matrix.headings.length - 1)}%;`">{{ heading }}</th>
            </tr>
          </thead>

          <tbody v-for="row in data.matrix.rows" :key="row.id">
            <tr>
              <td scope="row" class="text-start fw-bold">
                {{ row.title }}
                <div v-if="row.description" class="text-start text-secondary fw-lighter">{{ row.description }}</div>
              </td>
              <td v-for="(check, index) in row.versions" :key="index">
                <svg v-if="check" class="bi" width="24" height="24"><use xlink:href="#check" /></svg>
                <span v-else>&nbsp;</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Provide a link to additional modules if they're available. -->

    <div v-if="data.modules_available" class="px-4 py-5 text-center">
      <div class="py-5">
        <h1 class="display-6 fw-bold">Need more functionality?</h1>
        <div class="col-lg-6 mx-auto text-secondary">
          <p class="fs-5 mb-4">Discover additional modules that can be seamlessly integrated to fulfill your unique requirements.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <a href="/account/integration" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3">Explore Modules</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="m-5">&nbsp;</div>
  </div>
</template>

<script setup>
import { PageHeading, Spinner } from "backstack-vue-assets";
import { ref } from "vue";
import axios from "axios";

const fetching = ref(false);
const data = ref({});

const fetchData = async () => {
  fetching.value = true;
  await axios
    .get("https://api.backstack.com/v1/account/versions", { api: "backstack" })
    .then((response) => {
      console.log(response.data);
      data.value = response.data;
    })
    .finally(() => {
      fetching.value = false;
    });
};

fetchData();
</script>

<style scoped>
.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

/* 
.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
} */
</style>
