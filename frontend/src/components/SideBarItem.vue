<template>
	<div>
		<div
			:style="{ marginLeft: indent + 'em' }"
			@click="$emit('file-clicked', file)"
		>
			{{ file.Name }}
		</div>

		<template v-if="file.Children">
			<side-bar-item
				v-for="f in file.Children"
				:key="f.Name"
				@file-clicked="$emit('file-clicked', $event)"
				:file="f"
				:indent="indent + 1"
			/>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
	file: {
		type: Object,
		required: true,
	},
	indent: {
		type: Number,
		required: true,
	},
});
</script>

<style></style>
