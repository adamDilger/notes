<template>
	<div class="flex p-2">
		<div class="py-2 px-1 w-32">
			<side-bar @file-clicked="fileClicked" />
		</div>
		<div class="flex-1">
			<vue-simplemde v-model="content" ref="markdownEditor" :configs="{ toolbar: false }" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useFiles from "../store/useFiles";
import { debouncedWatch } from "@vueuse/core";

import * as VueSimplemde from "vue-simplemde"
import SideBar from "../components/SideBar.vue";

const content = ref<string>("");
const markdownEditor = ref(null);

const { init: initFiles, root, readFile, saveCurrentFile } = useFiles();

const getMessage = async () => {
	await initFiles();

	if (root.value?.Children[0]) {
		let a = root.value.Children[0];
		content.value = await readFile(a);
	}
};

getMessage();

async function fileClicked(file: any) {
	content.value = await readFile(file);
}

debouncedWatch(
	content,
	async () => {
		await saveCurrentFile(content.value);
	},
	{ debounce: 2000 }
);
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
