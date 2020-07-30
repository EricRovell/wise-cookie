<script>
  import App from "@stores/app.js";

  import Phrase from "@components/Phrase.svelte";
  import Loader from "@components/Loader.svelte";
  import Cookies from "@components/Cookies.svelte";

  let fetchingPhrase;

  function someEvent(event) {
    fetchingPhrase = $App.eatCookie(event.detail.index);
  }
</script>

<div class="container">
  <Cookies on:eatingcookie={someEvent} />
  <div>
    {#await fetchingPhrase || $App.lastPhrase()}
      <Loader />
    {:then phrase}
      {#if phrase}
        <Phrase {phrase} />
      {:else}
        <p>Please, eat a Cookie!</p>
      {/if}
    {:catch error}
      <p>Something is wrong: {error.message}</p>
    {/await}
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template: 3em 1fr / 1fr;
    row-gap: 3em;
    width: 100%;
  }
</style>
