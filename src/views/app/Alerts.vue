<script setup>
import { PageHeading } from "@/components";
import { useSession } from "@/session";

const session = useSession();

function getTimestampAge(timestamp) {
  const now = new Date();
  const alertDate = new Date(timestamp * 1000);
  const diffTime = Math.abs(now - alertDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 1 ? 'now' : `${diffDays}d`;
}
</script>

<template>
  <PageHeading heading="Alerts">
    <template #text> Application alerts. </template>
  </PageHeading>


  <div v-if="session.alerts.length === 0">

    <div class="alert alert-info">You have no alerts.</div>
  </div>

  <div v-else class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
    <div class="list-group">
      <router-link v-for="alert in session.alerts" :key="alert.id" :to="alert.href"
        class="list-group-item list-group-item-action d-flex gap-3 py-3">
        <div class="d-flex gap-2 w-100 justify-content-between">
          <div>
            <div :class="['d-flex align-items-center', { 'text-danger': alert.priority === 1 }]">
              <i v-if="alert.priority === 1" class="bi bi-exclamation-triangle" style="margin-right: 0.4rem;"></i>
              <div class="fs-5">{{ alert.title }}</div>
            </div>
            <p class="mb-0 opacity-50">{{ alert.text }}</p>
          </div>

          <small class="opacity-50 text-nowrap">{{ getTimestampAge(alert.timestamp) }}</small>

        </div>
      </router-link>
    </div>
  </div>
</template>

