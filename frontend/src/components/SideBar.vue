<template>
	<SideBarItem
		v-for="f in root?.Children"
		:key="f.Name"
		@file-clicked="$emit('file-clicked', $event)"
		:file="f"
		:indent="0"
		:selectedFile="selectedFile"
	/>
</template>

<script setup lang="ts">
import useFiles from "../store/useFiles";
import SideBarItem from "./SideBarItem.vue";

const { root, selectedFile } = useFiles();
</script>

<style></style>
