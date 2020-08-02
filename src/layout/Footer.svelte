<script>
  import Heart from "@components/svg/Heart.svelte";
</script>

<footer>
  <div class="container">
    <span>
      Wise Cookie v.0.5
    </span>
    <div class="author">
      <div>
        <span>🍪 design</span>
        <a href="https://web.marcelforart.com/victoriakan">
          by Victoria
        </a>
      </div>
      <div>
        <span>Made with</span>
        <Heart />
        <a href="https://github.com/EricRovell">
          by Eric Rovell
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  footer {
    width: 100%;
    padding: 0.75em 1.25em;
  }

  footer :global(svg) {
    width: 1em;
    height: 1em;
  }

  .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: var(--max-width);
    margin: auto;
  }

  /* app name */
  .container > span {
    display: flex;
    align-items: flex-end;
  }

  .author {
    display: grid;
    row-gap: 0.3em;
    place-items: center end;
  }

  .author a {
    color: var(--color-3);
  }

</style>