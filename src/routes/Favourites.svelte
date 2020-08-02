<script>
  import App from "@stores/app.js";

  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
  import Phrase from "@components/Phrase.svelte";
  import MrCookie from "@components/MrCookie.svelte";
</script>

<svelte:head>
  <title>Favouries: Your personal storage</title>
</svelte:head>

<FadingWrapper>
  <div class="container">
    {#await $App.db.getFavourites()}
      <p>Loading...</p>
    {:then phrases}
      {#each phrases as [ id, phrase ]}
        <Phrase phrase={new $App.phrase({ id, ...phrase })} />
      {:else}
        <div class="empty-list">
          <MrCookie type="shocked" />
          <p>Woah! The list is empty!</p>
        </div>
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

  .empty-list {
    display: grid;
    place-items: center;
    row-gap: 1em;

    position: sticky;
    top: 10px;
    width: 275px;
    height: 275px;
  }

  .empty-list p {
    font-size: 1.5em;
  }
</style>