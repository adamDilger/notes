<template>
	<div>
		<vue-simplemde v-model="content" ref="markdownEditor" />
	</div>
</template>

<script>
import { ref } from "vue";
import VueSimplemde from "vue-simplemde";

export default {
	name: "Home",
	components: { VueSimplemde },
	setup() {
		const message = ref("Click the Icon");
		const content = ref(null);
		const markdownEditor = ref(null);

		try {
			const getMessage = async () => {
				const files = await window.backend.getFiles();
				console.log("files", files);

				content.value = await window.backend.readFile(files[0]);
			};

			getMessage();
		} catch (e) {
			console.log(e);
		}

		return {
			message,
			content,
			markdownEditor,
		};
	},
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>