import { readable } from "svelte/store";
import App from "@src/app/App.js";

export default readable(new App());
