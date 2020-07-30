<script>
  import MrCookie from "@components/MrCookie.svelte";
  import PhraseAwait from "@components/PhraseAwait.svelte";
</script>

<div class="container">
  <PhraseAwait />
  <MrCookie />  
</div>

<style>
  .container {
    display: grid;
    grid-template: 1fr / 1fr 250px;
    place-items: start center;
    column-gap: 2.25em;
  }

  @media screen and (max-width: 720px) {
    .container {
      display: grid;
      grid-template: min-content 1fr / 1fr;
      place-items: start center;
      column-gap: 2.25em;
    }
  }
</style>
