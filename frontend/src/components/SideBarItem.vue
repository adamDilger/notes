<template>
	<div>
		<div
			:style="{ marginLeft: indent + 'em' }"
			class="pl-2 cursor-pointer hover:bg-gray-300"
			:class="[isSelected ? 'bg-gray-200 font-bold' : '']"
			@click="$emit('file-clicked', file)"
		>
			{{ file.Name }}
		</div>

		<template v-if="file.Children">
			<side-bar-item
				v-for="f in file.Children"
				:key="f.Name"
				@file-clicked="$emit('file-clicked', $event)"
				:file="f"
				:indent="indent + 1"
				:selected-file="selectedFile"
			/>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
	file: TreeEntity,
	indent: number,
	selectedFile?: TreeEntity
}>();

const isSelected = computed(() => {
	return props.file == props.selectedFile;
});
</script>
