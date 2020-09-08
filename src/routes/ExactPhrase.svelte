<script lang="ts">
  import { replace } from "svelte-spa-router/Router.svelte";

  import PhraseFactory from "@app/PhraseFactory";
  import type { PhraseRouteParams, PhraseFactoryClassType, PhraseID } from "#types";

  import { decrypt } from "@util/encryptNumber";

  import Loader from "@components/Loader.svelte";
  import Phrase from "@components/Phrase/Phrase.svelte";

  // get fragment and position
  export let params = {} as PhraseRouteParams;

  let promise;
  
  $: phraseID = [
    decrypt(params.fragment.toString()),
    decrypt(params.position.toString(), 1618033789784537)
  ] as PhraseID;

  $: {
    if (!PhraseFactory.validateID(phraseID)) {
      replace("/404");
    }

    promise = PhraseFactory.fromID(phraseID);  
  }
</script>

<svelte:head>
  {#await promise}
    <title>Phrase is loading...</title>
  {:then phrase}
    {#if phrase}
      <title>Phrase from {phrase.author}</title>
      <!-- og -->
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Wise Cookie">
      <meta property="og:title" content="Wise Cookie">
      <meta property="og:description" content={`Wise Cookie: phrase from ${phrase.author}`}>
      <meta property="og:image" content="https://wise-cookie.com/images/cookie-clever.webp">
      <meta property="og:url" content="https://wise-cookie.com">
      <!--Twitter-->
      <meta name="twitter:title" content="Wise Cookie">
      <meta name="twitter:description" content="Wise Cookie: Get your daily piece of inspiration!">
      <meta name="twitter:image" content="https://wise-cookie.com/images/cookie-clever.webp">
      <meta name="twitter:card" content={`Wise Cookie: phrase from ${phrase.author}`}>
      <meta name="twitter:image:alt" content="Image of really clever Cookie">
    {/if}
  {/await}
</svelte:head>

<div>
  {#await promise}
    <Loader />
  {:then phrase}
    {#if phrase}
      <Phrase {phrase} />
    {/if}
  {:catch error}
    <p>Something is wrong: {error.message}</p>
  {/await}
</div>
