<template>
	<div>
		<side-bar-item v-for="f in files" :key="f.Name" @file-clicked="$emit('file-clicked', $event)" :file="f" :indent="0" />
	</div>
</template>

<script>
import useFiles from "../store/useFiles";
import SideBarItem from "./SideBarItem.vue";

export default {
	components: { SideBarItem },
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