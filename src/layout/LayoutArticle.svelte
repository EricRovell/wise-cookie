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

  :global(article h1) {
    color: var(--color-3);
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-size: 1.4em;
  }

  :global(article h2) {
    color: var(--color-3);
    margin-top: 1em;
    margin-bottom: 0.1em;
    font-size: 1.1em;
  }

  :global(article p) {
    text-indent: 0.75em;
  }

  :global(article ul) {
    list-style: none;
    counter-reset: options;
  }

  :global(article ul li) {
    counter-increment: options
  }

  :global(ul li:before) {
    content: counter(options) ". ";
  }

  :global(article > button) {
    place-self: center;
  }
</style>
