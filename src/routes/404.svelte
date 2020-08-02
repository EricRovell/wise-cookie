<script>
  import MrCookie from "@components/MrCookieShocked.svelte";
</script>

<svelte:head>
  <title>404: Sorry, but there no cookies!</title>
</svelte:head>

<div>
  <MrCookie />
  <p>404</p>
  <p>Sorry, there are no cookies on this page!</p>
</div>

<style>
  div {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 1.5em;
    place-items: start center;
  }

  p:first-of-type {
    font-size: 3em;
    font-weight: 700;
  }

  p:last-of-type {
    font-size: 1.75em;
  }
</style>
