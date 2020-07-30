<script>
  import App from "@stores/app.js"; 

  import Loader from "@components/Loader.svelte";
  import Phrase from "@components/Phrase.svelte";

  // category, #pack, #position
  export let params = {};
</script>

<div>
  {#await $App.phrase.fromURL(params)}
    <Loader />
  {:then phrase}
    <Phrase {phrase} />
  {:catch error}
    <p>Something is wrong: {error}</p>
  {/await}
</div>
