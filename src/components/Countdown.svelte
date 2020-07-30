<script>
  import { onMount } from "svelte";
  import Button from "@components/Button.svelte";
  import renderTime from "@util/renderTime.js";

  // number of miliseconds to countdown
  export let timestamp = 0;
  export let hide;

  onMount(() => {
    const tick = setInterval(() => {
      timestamp -= 1000;
    }, 1000);

    return () => clearInterval(tick);
  });
</script>

{#if timestamp > 0}
  <div class="timer">
    <div>Cookie will be ready in:</div>
    <div class="time">{renderTime(timestamp)}</div>
    <p>You can see the previous phrase you already have.</p>
    <p>Thank you for patience!</p>
    <Button
      handleClick={hide}
      message={"Got it!"} />
  </div>
{:else}
  <div class="timer">
    <div>Cookie is ready!</div>
    <Button
      handleClick={hide}
      message={"Got it!"} />
  </div>
{/if}

<style>
  .timer {
    display: grid;
    grid-auto-rows: min-content;
    justify-items: center;
    row-gap: 0.75em;
  }

  .time {
    font-size: 1.75em;
  }
</style>
