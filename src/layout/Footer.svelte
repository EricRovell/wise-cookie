<script>
  import { routesFooter } from "@routes/navigation-routes";

  import Heart from "@components/svg/Heart.svelte";
</script>

<footer>
  <div class="container">
    <div class="owner">
      <span>Wise Cookie</span>
      <span>brought to you by <a href="mailto:umarovtemur25@gmail.com">Temur Umarov</a></span>
    </div>      
    <nav aria-label="Footer">
      <ol>
        {#each routesFooter as { label, href }}
          <li>
            <a {href}>{label}</a>
          </li>
        {/each}
      </ol>
    </nav>
    <div class="author">
      <span>🍪 design <a href="https://web.marcelforart.com/victoriakan">by Victoria</a></span>      
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

  .owner {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-end;
  }

  /* nav */
  ol {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    height: 100%;
  }

  ol > li:not(:first-child) {
    margin-left: 0.5em;
  }

  .author {
    display: flex;
    flex-flow: column;
    align-items: flex-end;
  }

  .author a {
    color: var(--color-3);
  }

  @media screen and (max-width: 500px) {
    .container {
      flex-flow: column wrap;
      justify-content: flex-start;
    }

    .container > div {
      margin-bottom: 1em;
    }

    .owner,
    .author {
      align-items: center;
    }

    nav {
      order: 1;
    }
  }

</style>