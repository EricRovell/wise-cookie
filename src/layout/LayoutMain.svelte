<script>
  import Header from "@src/layout/Header.svelte";
  import Footer from "@src/layout/Footer.svelte";
</script>

<!--
  @component
  Main Layout component.
  Contains the persistent components across all application:
    - Header,
    - Footer.
-->
<main id="layout-main">
  <Header />
  <div class="content">
    <slot />
  </div>
  <Footer />
</main>

<style>
  #layout-main {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .content {
    display: grid;

    width: 100%;
    max-width: var(--max-width);
    min-height: 100vh;

    margin-bottom: 15vh;
    padding-top: 1.5em;
  }

  @media screen and (max-width: 720px) {
    .content {
      padding: 0 0.5em;
    }
  }
</style>