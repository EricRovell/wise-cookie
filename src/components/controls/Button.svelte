<script>
  export let handleClick = null;
  export let message = null;
  export let transparent = true;
  export let size = "auto";

  export let tooltip = null;
</script>

<button
  on:click={handleClick}
  class:transparent
  style="--height: {size};"
  data-tooltip={tooltip}>
    {#if message}
      <span>{message}</span>
    {:else}
      <slot />
    {/if}
</button>

<style>
  button {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.25em;
    border-radius: 5px;
    width: auto;
    height: auto;

    color: var(--color-gray-100);
    background-color: var(--color-3);

    transition: transform 0.15s ease-in-out;  
  }

  /* button:hover {
    transform: scale(1.1);
  } */

  button:active {
    transform: scale(0.75);
  }

  /* tooltip */

  button::after {
    content: attr(data-tooltip);
    position: absolute;
    top: calc(100% + 0.5em);
    left: 50%;

    font-size: 0.8em;
    color: var(--color-gray-700);

    background: var(--card-bg);
    border: 1px solid var(--color-3);
    border-radius: 5px;
    padding: 0.25em 0.75em;

    transition: transform 0.15s ease-in-out;
    transform-origin: 50% 0%;
    transform: scaleY(0) translateX(-50%);
    z-index: 50;
  }

  button:hover::after {
    transform: scaleY(1) translateX(-50%);
  }

  .transparent {
    background-color: transparent;
  }

  @media screen and (max-width: 640px) {
    button::after {
      display: none;
    }
  }
</style>
