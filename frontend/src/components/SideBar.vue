<template>
	<aside
		class="relative"
		@mouseup.right="$emit('show-popup')"
		@contextmenu.prevent
	>
		<SideBarItem
			v-for="f in root?.Children"
			:key="f.Name"
			@file-clicked="$emit('file-clicked', $event)"
			:file="f"
			:indent="0"
			@right-clicked="rightClick"
		/>
	</aside>
</template>

<script setup lang="ts">
import TreeEntity from "@/model/TreeEntity";
import { defineEmits } from "vue";
import useFiles from "../store/useFiles";
import SideBarItem from "./SideBarItem.vue";

const { root } = useFiles();

const emit = defineEmits(["file-clicked", "show-popup"]);

function rightClick(file: TreeEntity) {
	emit("show-popup", file);
}
</script>

<style></style>
