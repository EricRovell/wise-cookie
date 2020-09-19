<script>
  import { scale, fade } from "svelte/transition";
  import modal from "@stores/modal.js";

  $: {
    // mostly for safari hack
    if ($modal.show) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
</script>

{#if $modal.show}
  <div
    class="wrapper"
    on:click={() => modal.hide()}
    transition:fade={{ duration: 250 }}>
      <div
        class="modal"
        on:click|stopPropagation
        transition:scale={{ duration: 250 }}>
          <header>{$modal.title}</header>
          <svelte:component
            this={$modal.contents}
            {...$modal.props}
            hide={() => modal.hide()} /> 
      </div>
  </div>
{/if}

<style>
  .wrapper {
    position: fixed;
    transform: translate3d(0, 0, 0);
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgb(0 0 0 / 0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 100;
  }

  @supports (backdrop-filter: blur(5px)) {
    .wrapper { 
      backdrop-filter: blur(3px);
    }
  }

  .modal {
    display: grid;
    grid-template: min-content auto / 1fr;
    row-gap: 1em;
    justify-items: stretch;

    max-width: 500px;
    max-height: 500px;
    background: var(--bg);
    border-radius: 10px;
    padding: 1.75em 1.25em;

    border: 1px solid var(--color-3-35);

    overflow-y: auto;
  }

  header {
    font-size: 2em;
    padding-bottom: 0.25em;
    border-bottom: 1px solid var(--color-3-35);
    width: 100%;

    text-align: center;
  }

  @media screen and (max-width: 640px) {
    .modal {
      max-width: 90vw;
      max-height: 75vh;
    }
  }
</style>
