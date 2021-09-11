<template>
	<div class="flex h-screen w-screen">
		<side-bar
			class="py-2 px-1 overflow-y-auto overflow-x-none bg-gray-300 w-60"
			@file-clicked="fileClicked"
			@show-popup="onShowPopup"
		/>

		<div class="flex-1 flex flex-col h-full overflow-hidden">
			<div class="py-2 px-4 flex justify-between bg-gray-500 text-white">
				<span class="font-bold">{{ currentFile?.Name || "" }}</span>
				<span v-if="saving">Saving...</span>
			</div>
			<section class="flex-1 p-2 overflow-y-scroll overflow-x-none" ref="ta" />
		</div>
	</div>

	<Popup :show="showPopup" @close="onClosePopup" @action="doPopupAction" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useFiles from "../store/useFiles";

import { ignorableWatch } from "@vueuse/core";
import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { markdown } from "@codemirror/lang-markdown";

import SideBar from "../components/SideBar.vue";
import Popup from "../components/Popup.vue";
import TreeEntity from "@/model/TreeEntity";

const ta = ref<HTMLTextAreaElement>();

const content = ref<string>("");
const saving = ref(false);

const showPopup = ref(false);

const {
	init: initFiles,
	root,
	readFile,
	saveCurrentFile,
	currentFile,
	optionsFile,
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

function onShowPopup(file?: TreeEntity) {
	optionsFile.value = file;
	showPopup.value = true;
}

function onClosePopup() {
	optionsFile.value = undefined;
	showPopup.value = false;
}

async function doPopupAction(action: string) {
	const tree = optionsFile.value || root.value;

	if (!tree) return;

	switch (action) {
		case "newnote": {
			let filename = prompt("File name");

			if (filename) {
				await window.backend.Files.CreateFile(
					optionsFile.value?.SubPath,
					filename
				);

				tree.Children.push({
					Children: [],
					IsDir: false,
					SubPath: optionsFile.value?.SubPath || "/",
					Name: filename,
				});
			}
			break;
		}
		case "deletenote": {
			// find the parent of the root

			await window.backend.Files.DeleteFile(
				optionsFile.value?.SubPath,
				optionsFile.value?.Name || ""
			);

			initFiles();

			break;
		}
	}

	onClosePopup();
}
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>

<style>
.cm-editor.cm-focused {
	outline: none;
}
</style>
