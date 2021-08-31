<template>
	<div>
		<side-bar @file-clicked="fileClicked" />
		<vue-simplemde v-model="content" ref="markdownEditor" :configs="{ toolbar: false }" />
	</div>
</template>

<script>
import { ref } from "vue";
import VueSimplemde from "vue-simplemde";
import SideBar from "../components/SideBar.vue";

import useFiles from "../store/useFiles";

export default {
	name: "Home",
	components: { VueSimplemde, SideBar },
	setup() {
		const message = ref("Click the Icon");
		const content = ref(null);
		const markdownEditor = ref(null);

		const { init: initFiles, files, readFile } = useFiles();

		try {
			const getMessage = async () => {
				await initFiles();

				if (files.value[0]) {
					content.value = await readFile(files.value[0].SubPath + "/" + files.value[0].Name);
				}
			};

			getMessage();
		} catch (e) {
			console.log(e);
		}

		return {
			message,
			content,
			markdownEditor,

			async fileClicked(file) {
				content.value = await readFile(file);
			},
		};
	},
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>