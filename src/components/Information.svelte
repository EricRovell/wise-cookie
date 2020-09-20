<script>
  import modal from "@stores/modal";
  import Greetings from "@components/modals/Greetings.svelte";

  function handleClick() {
    modal.set({
      show: true,
      title: "Greetings!",
      contents: Greetings
    });
  }
</script>

<button on:click={handleClick}>
  <svg viewBox="0 0 100 100">
    <title>Help</title>
    <g>
      <path d="M49.35,27.34c-9.19,0-13.41,5.45-13.41,9.12A3.91,3.91,0,0,0,40,40.35c3.67,0,2.18-5.25,9.12-5.25,3.4,0,6.13,1.5,6.13,4.63,0,3.68-3.82,5.79-6.06,7.7-2,1.7-4.56,4.49-4.56,10.35,0,3.54,1,4.56,3.74,4.56,3.34,0,4-1.5,4-2.79,0-3.54.07-5.59,3.81-8.51,1.84-1.43,7.63-6.06,7.63-12.46S58.07,27.34,49.35,27.34Z" />
      <path d="M48.47,67a5.24,5.24,0,0,0,0,10.48,5.24,5.24,0,1,0,0-10.48Z" />
      <path d="M87.44,19.1l-29.39-17a16.13,16.13,0,0,0-16.1,0l-29.39,17a16.16,16.16,0,0,0-8.07,14V66.94a16.16,16.16,0,0,0,8.07,14L42,97.85a16.13,16.13,0,0,0,16.1,0L87.44,80.9a16.16,16.16,0,0,0,8.07-14V33.06A16.16,16.16,0,0,0,87.44,19.1Zm.26,47.84a8.33,8.33,0,0,1-4.16,7.19l-29.39,17a8.31,8.31,0,0,1-8.3,0l-29.39-17a8.32,8.32,0,0,1-4.15-7.19V33.06a8.32,8.32,0,0,1,4.15-7.19l29.4-17a8.29,8.29,0,0,1,8.29,0l29.39,17a8.33,8.33,0,0,1,4.16,7.19V66.94Z" />
    </g>
  </svg>  
</button>

<style>
  button {
    grid-column: 2;
    place-self: end;

    display: flex;
    justify-content: center;
    align-items: center;

    position: sticky;
    bottom: 5vh;

    width: 1.75em;
    height: 1.75em;
    background: none;

    transition: transform 0.15s ease-in-out;
    outline: none;
  }

  button:hover {
    transform: scale(1.1);
  }

  button:active {
    transform: scale(0.85);
    background: none;
  }

  svg {
    width: 1.5em;
    height: 1.5em;
    fill: var(--color-3);
  }

  @media screen and (max-width: 720px) {
    button {
      grid-column: 1;
      place-self: end start;
    }
  }
</style>