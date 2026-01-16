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
<script lang="ts" setup>
import NcListItem from "@nextcloud/vue/components/NcListItem";
import type { MenuItemProps } from "@xwiki/platform-dsapi";

defineProps<MenuItemProps>();
</script>

<template>
  <span class="item-wrapper">
    <nc-list-item v-if="disabled" @click.capture.stop.prevent compact disabled>
      <template #name>
        <slot name="default" />
      </template>
    </nc-list-item>
    <nc-list-item v-else @click.prevent compact>
      <template #name>
        <slot name="default" />
      </template>
    </nc-list-item>
  </span>
</template>

<style scoped>
.item-wrapper :deep(.list-item-content__main) {
  width: fit-content;
}

:deep(li[disabled] .list-item) {
  filter: saturate(.7);
  opacity: .5;
  cursor: default;
}

:deep(li[disabled] .list-item a),
:deep(li[disabled] .list-item a *) {
  cursor: default;
}

:deep(li[disabled] .list-item:hover),
:deep(li[disabled] .list-item:focus-within) {
  background: none;
}
</style>
