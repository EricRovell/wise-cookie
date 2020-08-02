<script>
  import { onMount } from "svelte";
  import App from "@stores/app.js";

  import Cookie from "@components/Cookie.svelte";
  import PhrasePromise from "@components/PhrasePromise.svelte";

  let phrases = [];

  // fetching last generated phrases
  onMount(async () => {
    phrases = await $App.lastPhrases();
  });

  function eatCookie(event) {
    const index = event.detail.index;
    phrases[index] = $App.eatCookie(index);
  }
</script>

<div class="container">
  <div class="cookies">
    {#each [0, 1, 2] as index}
      <Cookie
        {index}
        on:eatingcookie={eatCookie} />
    {/each}
  </div>
  <div class="gradient" />
  <div class="phrases">
    {#each [0, 1, 2] as index}
      <PhrasePromise promisedPhrase={phrases[index]} />
    {/each}
  </div>
</div>

<style>
  .container {
    display: grid;
    row-gap: 1.5em;
    width: 100%;
  }

  .cookies {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    height: 70px;

    position: sticky;
    top: 0;
    z-index: 2;

    background: var(--bg);
  }

  .gradient {
    position: sticky;
    top: 70px;
    z-index: 2;

    width: 100%;
    height: 2.5em;
    background: linear-gradient(180deg, var(--bg) 35%, transparent 100%);
  }

  .phrases {
    display: grid;
    row-gap: 1.5em;
  }
</style>
