import { ref } from "vue";
import TreeEntity from "@/model/TreeEntity";

const root = ref<TreeEntity>();

// current is the file open in the editor
const currentFile = ref<TreeEntity | undefined>();
// options is the file being edited by options e.g. right click
const optionsFile = ref<TreeEntity | undefined>();

async function init() {
	root.value = await window.backend.Files.GetFiles();
}

export default () => {
	return {
		init,

		root,
		currentFile,

		optionsFile,

		async readFile(file: TreeEntity): Promise<string> {
			currentFile.value = file;

			if (file.IsDir) {
				return await window.backend.Files.ReadFileForDir(file.SubPath);
			}

			return await window.backend.Files.ReadFile(file.SubPath, file.Name);
		},

		async saveCurrentFile(content: string) {
			console.log("saveCurrentFile", currentFile.value, content);

			if (!currentFile.value) throw Error("No file selected.");

			if (currentFile.value.IsDir) {
				return await window.backend.Files.SaveFileForDir(
					currentFile.value.SubPath,
					content
				);
			}

			return await window.backend.Files.SaveFile(
				currentFile.value.SubPath,
				currentFile.value.Name,
				content
			);
		},
	};
};
