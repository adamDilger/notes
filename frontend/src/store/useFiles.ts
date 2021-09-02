import { ref } from "vue";
import TreeEntity from "@/model/TreeEntity";

const root = ref<TreeEntity>();

const selectedFile = ref<TreeEntity | undefined>();

async function init() {
	root.value = await window.backend.Files.GetFiles();
}

export default () => {
	return {
		init,

		root,
		selectedFile,

		async readFile(file: TreeEntity): Promise<string> {
			selectedFile.value = file;

			if (file.IsDir) {
				return await window.backend.Files.ReadFileForDir(file.SubPath);
			}

			return await window.backend.Files.ReadFile(file.SubPath, file.Name);
		},

		async saveCurrentFile(content: string) {
			console.log("saveCurrentFile", selectedFile.value, content);

			if (!selectedFile.value) throw Error("No file selected.");

			if (selectedFile.value.IsDir) {
				return await window.backend.Files.SaveFileForDir(
					selectedFile.value.SubPath,
					content
				);
			}

			return await window.backend.Files.SaveFile(
				selectedFile.value.SubPath,
				selectedFile.value.Name,
				content
			);
		},
	};
};
