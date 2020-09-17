<script lang="ts">
  import Cookie from "@app/Cookie";
  import User from "@app/User";
  import type { PhraseWithTimestamp, CookieIndex } from "#types";

  import { onMount } from "svelte";

  import CookieElement from "@components/Cookie.svelte";
  import Loader from "@components/Loader.svelte";
  import Phrase from "@components/Phrase/Phrase.svelte";
  import EatMe from "@components/EatMe.svelte";

  let phrases: PhraseWithTimestamp[] = [];
  let indexes: CookieIndex[] = [ 0, 1, 2 ];

  // fetching last generated phrases
  onMount(async () => {
    let currentPhrases = await User.getCurrentPhrases();
    phrases = currentPhrases.sort((a, b) => b.timestamp - a.timestamp);
  });

  async function eatCookie(event) {
    const index = event.detail.index;
    const phraseFromCookie = await Cookie.eatCookie(index);

    // get new phrase and shift to get the latest 3
    // sorting on timestamp desc
    phrases = [ phraseFromCookie, ...phrases ]
      .slice(0, 3)
      .sort((a, b) => b.timestamp - a.timestamp);

    scrollTo(0, 0);
  }
</script>

<div class="container">
  <div class="cookies">
    {#each indexes as index}
      <CookieElement
        {index}
        on:eatingcookie={eatCookie} />
    {/each}
  </div>
  <div class="gradient" />
  <div class="phrases">
    {#await phrases}
      <Loader />
    {:then phrases}
      {#each phrases as phrase (phrase.timestamp)}
        <Phrase phrase={phrase} glowing />
      {:else}
        <EatMe />
      {/each}
    {:catch error}
      <p>Something is wrong: {error}</p>
    {/await}
  </div>
</div>

<style>
  .container {
    display: grid;
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

    background: var(--color-1);
    transition: background 0.35s linear;
  }

  .gradient {
    position: sticky;
    top: 70px;
    z-index: 2;

    width: 100%;
    height: 2.5em;
    background-color: #9e9e9e; /* fallback color if gradients are not supported */
    background: -webkit-linear-gradient(180deg, var(--color-1) 35%, transparent 100%); /* For Chrome 25 and Safari 6, iOS 6.1, Android 4.3 */
    background:    -moz-linear-gradient(180deg, var(--color-1) 35%, transparent 100%); /* For Firefox (3.6 to 15) */
    background:      -o-linear-gradient(180deg, var(--color-1) 35%, transparent 100%); /* For old Opera (11.1 to 12.0) */ 
    background:         linear-gradient(180deg, var(--color-1) 35%, transparent 100%);

    transition: background 0.35s linear;
  }

  .phrases {
    display: grid;
    row-gap: 2.25em;
    margin-top: 0.5em;

    padding: 0 15px;
  }
</style>
