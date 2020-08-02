<script>
  import MrCookie from "@components/MrCookie.svelte";
</script>

<svelte:head>
  <title>404: Sorry, but there no cookies!</title>
</svelte:head>

<div class="container">
  <div>
    <MrCookie type="shocked" />
  </div>
  <p>404</p>
  <p>Sorry, there are no cookies on this page!</p>
</div>

<style>
  .container {
    --img-size: 275px;

    position: sticky;
    top: 10px;
    height: min-content;

    display: grid;
    grid-auto-rows: min-content;
    row-gap: 1.5em;
    place-items: start center;
  }

  .container > div {
    width: var(--img-size);
    height: var(--img-size);
  }

  p:first-of-type {
    font-size: 3em;
    font-weight: 700;
  }

  p:last-of-type {
    font-size: 1.75em;
    text-align: center;
  }

  @media screen and (max-width: 720px) {
    .container {
      --img-size: 50vw;
    }
  }
</style>
