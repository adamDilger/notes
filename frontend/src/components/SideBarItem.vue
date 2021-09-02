<template>
	<div
		:style="{ paddingLeft: indent + 0.5 + 'em' }"
		class="cursor-pointer hover:bg-gray-100"
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
</template>

<script lang="ts" setup>
import TreeEntity from "@/model/TreeEntity";
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
	file: TreeEntity;
	indent: number;
	selectedFile?: TreeEntity;
}>();

defineEmits(["file-clicked"]);

const isSelected = computed(() => {
	return props.file == props.selectedFile;
});
</script>
