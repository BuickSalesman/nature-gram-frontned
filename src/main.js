import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.patch["Content-Type"] = "application/x-www-form-urlencoded";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/";

createApp(App).mount("#app");
