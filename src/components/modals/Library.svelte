<script>
  import { onMount } from "svelte";
  import App from "@stores/app.js";
  import Button from "@components/Button.svelte";
  import Cookie from "@components/svg/Cookie.svelte";

  export let hide;
  export let cookies = $App.PHRASES;
  let eatenCookies = 0;

  onMount(async () => {
    eatenCookies = await $App.db.getCookiesEaten();
  });
</script>

<div>
  <p>There are {cookies - eatenCookies} unique cookies awaits for you in our library!</p>
  <Cookie size="125px" eaten={true} />
  <Button message="OK" handleClick={() => hide()} />
</div>

<style>
  div {
    display: grid;
    place-items: center;
    grid-auto-rows: min-content;
    row-gap: 1.25em;
  }

  p {
    text-align: center;
    font-size: 1.4em;
  }
</style>
