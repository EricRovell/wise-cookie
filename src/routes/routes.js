// https://github.com/ItalyPaleAle/svelte-spa-router

import Home from "./Index.svelte";
import Help from "@routes/Help.svx";
import About from "@routes/About.svelte";

export default {
  // exact
  "/": Home,
  "/help": Help,
  "/about": About,
};
