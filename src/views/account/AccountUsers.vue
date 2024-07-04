<script setup>
import {PageHeading} from 'backstack-vue-assets'
</script>

<template>

<PageHeading heading="Users" as-subheading>
<template #text>
    Current account users.
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


<style scoped></style>