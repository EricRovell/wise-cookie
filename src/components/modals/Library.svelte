<script>
  import { onMount } from "svelte";
  import App from "@stores/app.js";

  export let hide;
  export let cookies = $App.PHRASES;
  let eatenCookies = 0;

  onMount(async () => {
    eatenCookies = await $App.db.getCookiesEaten();
  });
</script>

<div>
  <p>We have {cookies - eatenCookies} unique cookies of wisdom awaiting for you!</p>
  <button on:click={hide}>ok</button>
</div>
