<template>
	<div>
		<div :style="{ marginLeft: indent + 'em' }" @click="$emit('file-clicked', file)">
			{{ file.Name }}
		</div>

		<template v-if="file.Children">
			<side-bar-item v-for="f in file.Children" :key="f.Name" @file-clicked="$emit('file-clicked', $event)" :file="f" :indent="indent + 1" />
		</template>
	</div>
</template>

<script>
import useFiles from "../store/useFiles";

export default {
	props: {
		file: Object,
		indent: Number,
	},
	setup() {
		const { files } = useFiles();

		return {
			files,
		};
	},
};
</script>

<style>
</style>