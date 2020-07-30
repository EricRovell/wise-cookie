<script>
  import App from "@stores/app.js";

  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
  import Phrase from "@components/Phrase.svelte";
</script>

<FadingWrapper>
  <div class="container">
    {#await $App.db.getFavourites()}
      <p>Loading...</p>
    {:then phrases}
      {#each phrases as [ id, phrase ]}
        <Phrase phrase={new $App.phrase({ id, ...phrase })} />
      {:else}
        <p>The list is empty.</p>
      {/each}
    {:catch error}
      <p>Something is wrong: {error}</p>
    {/await}
  </div>
</FadingWrapper>

<style>
  .container {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 2.5em;
  }
</style>