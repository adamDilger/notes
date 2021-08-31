import { ref } from "vue";

const root = ref<TreeEntity>();

async function init() {
	root.value = await window.backend.getFiles();

	console.log(root.value);
}

export default () => {
	return {
		init,

		root,

		async readFile(file: TreeEntity) {
			if (file.IsDir) {
				return await window.backend.readFileForDir(file.SubPath);
			}

			return await window.backend.readFile(file.SubPath, file.Name);
		},
	};
};
