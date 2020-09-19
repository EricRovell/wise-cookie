// https://github.com/ItalyPaleAle/svelte-spa-router

import Home from "./Home.svelte";
import ExactPhrase from "./ExactPhrase.svelte";
import Help from "./Help.svx";
import About from "./About.svx";
import Secret from "./Secret.svelte";
import Favourites from "./Favourites.svelte";
import Privacy from "./Privacy.svx";
import Contact from "./Contact.svx";
import Page404 from "./404.svelte";

export default {
  "/": Home,
  "/phrase/:fragment/:position": ExactPhrase,
  "/help": Help,
  "/about": About,
  "/favourites": Favourites,
  "/secret/:pass": Secret,
  "/privacy": Privacy,
  "/contact": Contact,
  "*": Page404
};
