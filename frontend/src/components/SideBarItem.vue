<template>
	<div
		:style="{ paddingLeft: indent + 0.5 + 'em' }"
		class="cursor-pointer hover:bg-gray-100 select-none"
		:class="[
			isOptions
				? 'bg-red-400 font-bold'
				: isCurrent
				? 'bg-gray-200 font-bold'
				: '',
		]"
		@click="$emit('file-clicked', file)"
		@mouseup.right.stop="$emit('right-clicked', file)"
		@contextmenu.prevent
	>
		<span
			v-if="file.IsDir"
			class="inline-block h-full"
			@click.stop="toggleExpanded"
		>
			<template v-if="expanded">
				<chevron-down-icon class="h-5 w-5" />
			</template>
			<template v-else>
				<chevron-right-icon class="h-5 w-5" />
			</template>
		</span>
		{{ file.Name }}
	</div>

	<template v-if="file.Children && expanded">
		<side-bar-item
			v-for="f in file.Children"
			:key="f.Name"
			@file-clicked="$emit('file-clicked', $event)"
			@right-clicked="$emit('right-clicked', $event)"
			:file="f"
			:indent="indent + 1"
		/>
	</template>
</template>

<script lang="ts" setup>
import TreeEntity from "@/model/TreeEntity";
import useFiles from "@/store/useFiles";
import { computed, defineProps, defineEmits, ref } from "vue";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/vue/solid";

const props = defineProps<{
	file: TreeEntity;
	indent: number;
}>();

defineEmits(["file-clicked", "right-clicked"]);
const expanded = ref(true);

const { currentFile, optionsFile } = useFiles();

const isCurrent = computed(() => props.file == currentFile.value);
const isOptions = computed(() => props.file == optionsFile.value);

function toggleExpanded() {
	expanded.value = !expanded.value;
}
</script>
