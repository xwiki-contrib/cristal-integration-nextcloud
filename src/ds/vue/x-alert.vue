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
import NcButton from "@nextcloud/vue/components/NcButton";
import NcNoteCard from "@nextcloud/vue/components/NcNoteCard";
import { CIcon } from "@xwiki/platform-icons";
import { ref } from "vue";
import type { AlertProps } from "@xwiki/platform-dsapi";
import type { Ref } from "vue";

defineProps<AlertProps>();

const opened: Ref<boolean> = ref(true);
</script>
<template>
  <nc-note-card
    v-if="opened"
    :heading="title"
    :type="type"
    :class="{ 'flat-corners': flatCorners }"
  >
    <template #default>
      <div class="alert-content-wrapper">
        <div class="alert-content">
          {{ description }}
          <x-btn
            v-for="action of actions"
            :key="action.name"
            size="small"
            variant="text"
            @click="action.callback"
            >{{ action.name }}</x-btn
          >
          <br v-if="details" />
          <small v-if="details">{{ details }}</small>
          <slot />
        </div>
        <nc-button
          v-if="closable"
          variant="tertiary"
          class="alert-close-button"
          @click="opened = false"
        >
          <template #icon>
            <c-icon name="x"></c-icon>
          </template>
        </nc-button>
      </div>
    </template>
  </nc-note-card>
</template>

<style scoped>
.flat-corners {
  border-radius: initial;
}

:deep(.alert-content-wrapper) {
  display: flex;
}

:deep(.alert-close-button) {
  height: fit-content;
}
</style>
