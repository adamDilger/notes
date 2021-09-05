<template>
	<Popover>
		<div v-if="show">
			<PopoverPanel
				class="absolute z-10 bg-gray-100"
				static
				:style="{ top: yVal, left: xVal }"
			>
				<div class="grid grid-cols-2">
					<div>Analytics</div>
					<div>Engagement</div>
					<div>Security</div>
					<div>Integrations</div>
				</div>
			</PopoverPanel>
		</div>
	</Popover>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { Popover, PopoverPanel } from "@headlessui/vue";
import { useMouse } from "@vueuse/core";

const props = defineProps<{
	show: boolean;
}>();

const { x, y } = useMouse();

const xVal = ref<string>();
const yVal = ref<string>();

watch(
	() => props.show,
	(val: boolean) => {
		console.log(x.value, y);
		if (val) {
			xVal.value = x.value + "px";
			yVal.value = y.value + "px";
		} else {
			xVal.value = undefined;
			yVal.value = undefined;
		}
	}
);
</script>
