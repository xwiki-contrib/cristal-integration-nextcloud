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
import type { TextFieldProps } from '@xwiki/platform-dsapi'

import NcTextField from '@nextcloud/vue/components/NcTextField'

const input = defineModel<string>()
defineProps<TextFieldProps>()
</script>

<template>
	<NcTextField
		v-model="input"
		:label="label"
		:autofocus="autofocus"
		:helperText="help"
		:readonly="readonly"
		:required="required"
		:type="type ?? 'text'"
		:class="{ 'x-text-field--slotted': $slots.default }">
		<template v-if="$slots.default" #icon>
			<slot name="default" />
		</template>
	</NcTextField>
</template>

<style scoped>
.input-field--leading-icon {
  --input-padding-start: var(--border-radius-element);
}

:deep(.input-field__icon) {
  width: unset;
}

/*
 * NcTextField only exposes a leading-icon slot for custom content, sized for a
 * single icon. When arbitrary content is slotted (e.g. a location breadcrumb),
 * let it span the whole field content area, left aligned, and hide the unused
 * input value behind it, so it is not cramped into the leading-icon box.
 */
.x-text-field--slotted :deep(.input-field__icon--leading) {
  position: absolute;
  inset-inline: 0;
  inset-block: 0;
  width: auto;
  align-items: center;
  justify-content: flex-start;
  padding-inline: var(--input-padding-start, var(--border-radius-element));
  overflow: hidden;
}

.x-text-field--slotted :deep(.input-field__input) {
  color: transparent;
}

/*
 * A breadcrumb is a chunky nav widget; compact it so it sits on the field value
 * line without overflowing over the floating label above.
 */
.x-text-field--slotted :deep(.breadcrumb),
.x-text-field--slotted :deep(.breadcrumb nav),
.x-text-field--slotted :deep(.breadcrumb ul),
.x-text-field--slotted :deep(.breadcrumb li) {
  min-height: 0;
  height: auto;
}

.x-text-field--slotted :deep(.breadcrumb .button-vue) {
  min-height: 0;
  height: var(--clickable-area-small, 28px);
  padding-block: 0;
}
</style>
