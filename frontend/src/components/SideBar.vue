<template>
	<aside @mouseup.right="rightClick" @contextmenu.prevent class="relative">
		<SideBarItem
			v-for="f in root?.Children"
			:key="f.Name"
			@file-clicked="$emit('file-clicked', $event)"
			:file="f"
			:indent="0"
			:selectedFile="selectedFile"
		/>
		<Popup :show="showPopup" />
	</aside>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
import useFiles from "../store/useFiles";
import SideBarItem from "./SideBarItem.vue";
import Popup from "./Popup.vue";

const { root, selectedFile } = useFiles();

defineEmits(["file-clicked"]);

const showPopup = ref(false);

function rightClick() {
	showPopup.value = true;
}
</script>

<style></style>
