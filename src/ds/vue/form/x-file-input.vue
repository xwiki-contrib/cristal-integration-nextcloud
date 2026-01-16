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
import messages from "../../translations";
import { CIcon } from "@xwiki/platform-icons";
import { defineModel, ref, useId } from "vue";
import { useI18n } from "vue-i18n";
import type { FileInputModel, TextFieldProps } from "@xwiki/platform-dsapi";
import type { Ref } from "vue";

defineProps<TextFieldProps>();
const model = defineModel<FileInputModel>();

const inputId = useId();
const fileName: Ref<string> = ref("");

const { t } = useI18n({
  messages,
});

function change(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files || files.length == 0) {
    model.value = undefined;
  } else if (files.length == 1) {
    model.value = files[0];
  } else {
    const value = [];
    for (let i = 0; i < files.length; i++) {
      value.push(files[i]);
    }
    model.value = value;
  }
  fileName.value = Array.from(files ?? []).map((f: File) => f.name).join(", ");
}
</script>

<template>
  <label :for="inputId">
    <c-icon slot="icon" name="paperclip"></c-icon>
    <x-text-field
      v-model="fileName"
      :placeholder="t('nextcloud.file.input.none')"
      readonly
    ></x-text-field>
  </label>
  <input :id="inputId" type="file" @change="change($event)" multiple />
</template>

<style scoped>
input {
  display: none;
}

label {
  display: flex;
  gap: var(--cr-spacing-x-small);
}

.input-field {
  pointer-events: none;
}

:deep(.cr-icon) {
  line-height: var(--cr-line-height-normal);
  cursor: pointer;
}
</style>
