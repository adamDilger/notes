import { ref } from 'vue'

const files = ref([]);

async function init() {
  files.value = (await window.backend.getFiles()).Children;
  
  console.log(files.value)
}

export default () => {
  return {
    init,

    files,

    async readFile(file) {
      if (file.IsDir) {
        return await window.backend.readFileForDir(file.SubPath);
      }

      return await window.backend.readFile(file.SubPath, file.Name);
    }
  }
}
