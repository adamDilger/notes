<template>
	<div class="flex p-2 h-full">
		<div class="py-2 px-1 w-32 overflow-scroll">
			<side-bar @file-clicked="fileClicked" />
		</div>
		<section class="flex-1 h-full" ref="ta" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import useFiles from "../store/useFiles";

import { debouncedWatch } from "@vueuse/core";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { markdown } from "@codemirror/lang-markdown"

import SideBar from "../components/SideBar.vue";

const ta = ref<HTMLTextAreaElement>();

const content = ref<string>("");
const fileChanged = ref<boolean>(true);

const { init: initFiles, root, readFile, saveCurrentFile } = useFiles();
let cm: EditorView;

onMounted(() => {
	if (!ta.value) return;

	cm = new EditorView({
		state: EditorState.create({ doc: "# OH", extensions: [basicSetup, markdown(), EditorView.lineWrapping] }),
		parent: ta.value,
	})

	console.log(cm);
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

watch(content, (val) => {
	//cm.update
	//cm.getDoc().setValue(val);
	cm.setState(
		EditorState.create({ doc: val, extensions: [basicSetup, markdown()] }),
	);
});

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
