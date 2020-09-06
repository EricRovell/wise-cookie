// https://github.com/ItalyPaleAle/svelte-spa-router

import Home from "./Home.svelte";
import ExactPhrase from "./ExactPhrase.svelte";
import Help from "@routes/Help.svx";
import About from "@routes/About.svx";
import Secret from "@routes/Secret.svelte";
import Favourites from "@routes/Favourites.svelte";
import Page404 from "@routes/404.svelte";

export default {
  "/": Home,
  "/phrase/:fragment/:position": ExactPhrase,
  "/help": Help,
  "/about": About,
  "/favourites": Favourites,
  "/secret/:pass": Secret,
  "*": Page404
};
