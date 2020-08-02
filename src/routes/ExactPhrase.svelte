<script>
  import App from "@stores/app.js"; 

  import Loader from "@components/Loader.svelte";
  import Phrase from "@components/Phrase.svelte";

  // category, #pack, #position
  export let params = {};

  let promise = $App.phrase.fromURL(params);
</script>

<svelte:head>
  {#await promise}
    <title>Phrase is loading...</title>
  {:then phrase}
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
  {/await}
</svelte:head>

<div>
  {#await promise}
    <Loader />
  {:then phrase}
    <Phrase {phrase} />
  {:catch error}
    <p>Something is wrong: {error}</p>
  {/await}
</div>
