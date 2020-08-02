// https://github.com/ItalyPaleAle/svelte-spa-router

import Home from "./Home.svelte";
import ExactPhrase from "./ExactPhrase.svelte";
import Help from "@routes/Help.svx";
import About from "@routes/About.svx";
import Favourites from "@routes/Favourites.svelte";
import Page404 from "@routes/404.svelte";

export default {
  // exact
  "/": Home,
  "/phrase/:category/:pack/:position": ExactPhrase,
  "/help": Help,
  "/about": About,
  "/favourites": Favourites,
  "*": Page404
};
