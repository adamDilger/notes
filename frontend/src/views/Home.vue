<template>
	<div>
		<side-bar @file-clicked="fileClicked" />
		<vue-simplemde
			v-model="content"
			ref="markdownEditor"
			:configs="{ toolbar: false }"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useFiles from "../store/useFiles";

import VueSimplemde from "vue-simplemde";
import SideBar from "../components/SideBar.vue";

const content = ref<string>("");
const markdownEditor = ref(null);

const { init: initFiles, root, readFile } = useFiles();

const getMessage = async () => {
	await initFiles();

	if (root.value?.Children[0]) {
		let a = root.value.Children[0];
		content.value = await readFile(a);
	}
};

getMessage();

async function fileClicked(file: TreeEntity) {
	content.value = await readFile(file);
}
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
