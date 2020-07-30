<script>
  import App from "@stores/app.js";
  import { getContext, onMount } from "svelte";
  
  const phrase = getContext("phrase");

  let liked = false;

  async function rememberQuote() {
    await $App.db.markFavourite(phrase.toObject());
    liked = !liked;
  }

  onMount(async () => {
    liked = await $App.db.isFavourite(phrase.id);
  });
</script>

<!--
  @component
  Provides an action to add/remove phrase as favourite.

  Getting data using context with "phrase" key.
  Data is the phrase object { id, author, body }.

  Has "liked" boolean state.

  On mount asynchronously checks if the phrase a favourite one.
-->
<svg
  viewBox="0 0 100 100"
  class:liked
  on:click={rememberQuote}
  xmlns="http://www.w3.org/2000/svg">
    <title>Favourite</title>
    <path d="M98,36.29c0,23.54-40.18,47.89-48,52.36C42.16,84.05,2,59.57,2,36.29A24.89,24.89,0,0,1,26.86,11.4,24.35,24.35,0,0,1,47.7,22.63a2.84,2.84,0,0,0,4,.63,2.69,2.69,0,0,0,.63-.63A24.89,24.89,0,0,1,98,36.29Z" />
    <path d="M71.65,8.61h0A28.08,28.08,0,0,0,50,18.61a27.7,27.7,0,0,0-21.65-10A28.35,28.35,0,0,0,0,37C0,63.8,46.84,90,48.73,91a2.3,2.3,0,0,0,2.54,0C53.16,90,100,64.18,100,37A28.35,28.35,0,0,0,71.65,8.61ZM50,86C42.66,81.64,5.06,58.73,5.06,37A23.29,23.29,0,0,1,28.35,13.67a22.8,22.8,0,0,1,19.5,10.51,2.66,2.66,0,0,0,3.71.59,2.75,2.75,0,0,0,.59-.59A23.29,23.29,0,0,1,94.94,37C94.94,59,57.34,81.77,50,86Z" />
</svg>

<style>
  svg {
    fill: var(--color-3);
    width: 100%;
    height: 100%;
    transition: transform 0.15s ease-in-out;
    cursor: pointer;
  }

  svg path:first-of-type {
    fill: none;
  }

  svg:hover {
    transform: scale(1.1);
  }

  svg:active {
    transform: scale(0.75);
  }

  .liked path:first-of-type {
    fill: var(--color-3);
  }
</style>
  