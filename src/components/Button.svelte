<script>
  export let handleClick;
  export let message = "Click me";
</script>

<button on:click={handleClick}>
  {message}
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.25em 0.75em;
    border-radius: 5px;
    width: max-content;

    color: var(--color-gray-100);
    background: var(--color-3);
  }
</style>
