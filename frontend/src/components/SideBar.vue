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
import { defineEmits } from 'vue';
import useFiles from "../store/useFiles";
import SideBarItem from "./SideBarItem.vue";

const { root, selectedFile } = useFiles();

defineEmits(['file-clicked']);
</script>

<style>
</style>
