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
import NcSelect from "@nextcloud/vue/components/NcSelect";
import { ref, watch } from "vue";
import type { SelectProps } from "@xwiki/platform-dsapi";
import type { Ref } from "vue";

defineProps<SelectProps>();
const selected = defineModel<string>();

const localSelected: Ref<string | null> = ref(null);

watch(selected, (newValue) => {
  localSelected.value = newValue != "" ? newValue : null;
}, { immediate: true });
</script>
<template>
  <div>
    <nc-select
      v-model="localSelected"
      :input-label="label"
      :options="items"
      :required="required"
      :class="{ notClearable: required }"
      @update:model-value="selected = localSelected ? localSelected : ''"
    ></nc-select>
    <p class="help-text">{{ help }}</p>
  </div>
</template>

<style scoped>
.v-select {
  width: 100%;
}

.v-select:not(.vs--open) :deep(label) {
  color: var(--color-text-maxcontrast);
}

.notClearable :deep(.vs__clear) {
  display: none;
}

.help-text {
  padding-block: 2px;
  padding-inline: var(--border-radius-element);
  align-items: center;
  color: var(--color-text-maxcontrast);
}
</style>
