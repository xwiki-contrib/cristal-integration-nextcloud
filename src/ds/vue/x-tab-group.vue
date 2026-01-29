<!--
  See the LICENSE file distributed with this work for additional
  information regarding copyright ownership.

  This is free software; you can redistribute it and/or modify it
  under the terms of the GNU Lesser General Public License as
  published by the Free Software Foundation; either version 2.1 of
  the License, or (at your option) any later version.

  This software is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this software; if not, write to the Free
  Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
  02110-1301 USA, or see the FSF site: http://www.fsf.org.
-->
<script setup lang="ts">
import NcAppSidebar from "@nextcloud/vue/components/NcAppSidebar";
import NcAppSidebarTab from "@nextcloud/vue/components/NcAppSidebarTab";
import { ref } from "vue";
import type { Ref } from "vue";
const tab: Ref<unknown> = ref();

const emits = defineEmits(["tab-change"]);

function change(event: string) {
  emits("tab-change", event);
}
</script>

<template>
  <nc-app-sidebar force-tabs no-toggle @update:active="change">
    <slot name="panels"></slot>
  </nc-app-sidebar>
</template>

<style scoped>
.app-sidebar {
  --app-sidebar-width: auto;
}

/* The component we use here is originally expected to be used as a sidebar.
   It still serves our purpose, but considering we want to use it anywhere
   we need to make some changes, e.g., hiding the header that includes a
   button to close the sidebar. */
:deep(.app-sidebar-header) {
  display: none;
}
</style>
