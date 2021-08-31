import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Wails from "@wailsapp/runtime";

import "./assets/tailwind.css";

Wails.Init(() => {
	createApp(App)
		.use(router)
		.mount("#app");
});
