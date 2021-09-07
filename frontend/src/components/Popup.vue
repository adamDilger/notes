<template>
	<div
		v-if="show"
		class="bg-black opacity-20 absolute top-0 left-0 right-0 bottom-0"
		@click="clickOut"
		@mouseup.right="clickOut"
		@contextmenu.prevent
	/>

	<div
		v-if="show"
		class="absolute z-10 bg-gray-100 rounded"
		:style="{ top: yVal, left: xVal }"
	>
		<div class="divide-y  divide-gray-300">
			<div
				v-for="m in menuItems"
				:key="m.label"
				class="px-2 py-2 cursor-pointer hover:bg-gray-200 text-sm"
				@click="$emit('action', m.label)"
			>
				<span>
					<component
						:is="m.icon"
						class="mx-1 h-5 w-5 text-gray-700 inline-block"
					/>
					{{ m.label }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { useMouse } from "@vueuse/core";
import useFiles from "@/store/useFiles";

import {
	FolderAddIcon,
	PlusCircleIcon,
	XCircleIcon,
} from "@heroicons/vue/outline";

const props = defineProps<{
	show: boolean;
}>();

const emit = defineEmits(["close", "action"]);

const { x, y } = useMouse();

const xVal = ref<string>();
const yVal = ref<string>();

const { optionsFile } = useFiles();

watch(
	() => props.show,
	(val: boolean) => {
		if (val) {
			xVal.value = x.value + 2 + "px";
			yVal.value = y.value + "px";
		}
	}
);

function clickOut() {
	emit("close");
}

const menuItems = computed(() => {
	if (optionsFile.value && optionsFile.value.IsDir) {
		return [{ label: "Delete Folder", icon: XCircleIcon }];
	} else if (optionsFile.value && optionsFile.value) {
		return [{ label: "Delete Note", icon: XCircleIcon }];
	}

	return [
		{ label: "New Note", icon: PlusCircleIcon },
		{ label: "New Folder", icon: FolderAddIcon },
	];
});
</script>
