import { ref } from "vue";

const root = ref<TreeEntity>();

const selectedFile = ref<TreeEntity | null>(null);

async function init() {
	root.value = await window.backend.getFiles();
}

export default () => {
	return {
		init,

		root,
		selectedFile,

		async readFile(file: TreeEntity) {
			selectedFile.value = file;

			if (file.IsDir) {
				return await window.backend.readFileForDir(file.SubPath);
			}

			return await window.backend.readFile(file.SubPath, file.Name);
		},

		async saveCurrentFile(content: string) {
			if (!selectedFile.value) throw Error("No file selected.");

			if (selectedFile.value.IsDir) {
				return await window.backend.saveFileForDir(selectedFile.value.SubPath);
			}

			return await window.backend.saveFile(
				selectedFile.value.SubPath,
				selectedFile.value.Name
			);
		},
	};
};
