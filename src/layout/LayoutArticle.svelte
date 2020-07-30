<script>
  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
</script>

<FadingWrapper>
  <article>
    <slot />
  </article>
</FadingWrapper>

<style>
  article {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 0.5em;

    font-size: 18px;
  }

  .article p {
    color: red;
  }
</style>
