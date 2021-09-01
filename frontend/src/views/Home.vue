<template>
	<div class="flex p-2 h-full">
		<div class="py-2 px-1 w-32">
			<side-bar @file-clicked="fileClicked" />
		</div>
		<div class="flex-1 h-full">
			<textarea ref="ta" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useFiles from "../store/useFiles";

import { debouncedWatch } from "@vueuse/core";
import CodeMirror from "codemirror";

import SideBar from "../components/SideBar.vue";

const ta = ref(null);

const content = ref<string>("");
const fileChanged = ref<boolean>(true);

const { init: initFiles, root, readFile, saveCurrentFile } = useFiles();

onMounted(() => {
	var myCodeMirror = CodeMirror.fromTextArea(ta.value, {
		lineNumbers: true,
		mode: "htmlmixed",
	});
	console.log(myCodeMirror, myCodeMirror.getValue());
});

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

	console.log("fileClicked", file, content.value);
	fileChanged.value = true;
}

debouncedWatch(
	content,
	async () => {
		if (fileChanged.value) return (fileChanged.value = false);

		await saveCurrentFile(content.value);
	},
	{ debounce: 2000 }
);
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
