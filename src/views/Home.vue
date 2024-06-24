<script setup>

import {Dropdown, PageHeading, Breadcrumbs} from "vue-assets"

</script>

<template>

  

    <Breadcrumbs class="mt-3" :links="[
      { label: 'Home', href: 'javascript:void(0)' },
      { label: 'Library', current: true }
    ]" />


    <PageHeading class="mt-5" heading="Backstack Options">

      <template #text>
        Backstack options for developer applications.
      </template>

      <template #actions>

        <input class="form-control" type="search" placeholder="Search" aria-label="Search">

        <Dropdown label='<i class="bi bi-funnel"></i> All' :options="[
          { label: 'google.com', href: 'https://google.com' },
          { label: 'Active', foo: 'bar' },
          { label: 'Inactive' }
        ]" @click="(option) => console.log(option)" />


        <button type="button" class="btn btn-primary">Add</button>

      </template>
    </PageHeading>




</template>

<style scoped>

</style>
