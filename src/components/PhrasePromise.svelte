<script>
  import Phrase from "@components/Phrase.svelte";
  import PhraseEmpty from "@components/PhraseEmpty.svelte";
  import Loader from "@components/Loader.svelte";

  export let promisedPhrase;
</script>

<div>
  {#await promisedPhrase}
    <Loader />
  {:then phrase}
    {#if phrase}
      <Phrase {phrase} />
    {:else}
      <PhraseEmpty />
    {/if}
  {:catch error}
    <p>Something is wrong: {error.message}</p>
  {/await}
</div>
