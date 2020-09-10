<script>
  import Header from "@src/layout/Header.svelte";
  import Footer from "@src/layout/Footer.svelte";
</script>

<!--
  @component
  Main (and only one) Root Layout component.
  Contains the persistent components across all application:
    - Header,
    - Footer.

  Dynamic content is located inside the slot of the .content element. 
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

    padding: 0 1em;
  }

  .content {
    display: grid;

    width: 100%;
    max-width: var(--max-width);
    min-height: 100vh;

    margin-bottom: 15vh;
    padding-top: 1.5em;
  }

  @media screen and (max-width: 640px) {
    #layout-main  {
      padding: 0 0.5em;
    }
  }

  @media screen and (max-width: 450px) {
    .content {
      padding: 0 0.25em;
    }
  }
</style>