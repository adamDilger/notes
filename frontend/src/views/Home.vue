<template>
	<div class="flex h-full">
		<side-bar
			class="py-2 px-1 w-32 overflow-auto bg-gray-300"
			@file-clicked="fileClicked"
		/>
		<div class="flex-1 flex flex-col">
			<div class="py-2 px-4 flex justify-between bg-gray-500 text-white">
				<span class="font-bold">
					{{ selectedFile?.Name || "" }}
				</span>
				<span v-if="saving">
					Saving...
				</span>
			</div>
			<section class="flex-1 p-2" ref="ta" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useFiles from "../store/useFiles";

import { ignorableWatch } from "@vueuse/core";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";

import SideBar from "../components/SideBar.vue";

const ta = ref<HTMLTextAreaElement>();

const content = ref<string>("");
const saving = ref(false);

const {
	init: initFiles,
	root,
	readFile,
	saveCurrentFile,
	selectedFile,
} = useFiles();
let cmView: EditorView;
let cmState: EditorState;

function createState(v: string = "") {
	cmState = EditorState.create({
		doc: v,
		extensions: [
			basicSetup,
			markdown(),
			EditorView.lineWrapping,
			EditorView.updateListener.of((v) => {
				if (v.docChanged) {
					content.value = v.state.sliceDoc();
				}
			}),
		],
	});
}

onMounted(() => {
	if (!ta.value) return;

	createState();

	cmView = new EditorView({
		state: cmState,
		parent: ta.value,
	});
});

const getMessage = async () => {
	await initFiles();

	const firstFile = root.value?.Children[0];
	if (firstFile) {
		createState(await readFile(firstFile));
		cmView.setState(cmState);
	}
};

getMessage();

const { ignoreUpdates } = ignorableWatch(content, async () => {
	saving.value = true;
	await saveCurrentFile(content.value);
	setTimeout(() => (saving.value = false), 400);
});

async function fileClicked(file: any) {
	ignoreUpdates(() => (content.value = ""));
	createState(await readFile(file));
	cmView.setState(cmState);
}
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
