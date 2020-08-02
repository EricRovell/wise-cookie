<script>
  import App from "@stores/app.js";
  import Button from "@components/Button.svelte";
  import Cookie from "@components/svg/Cookie.svelte";
  import MrCookie from "@components/MrCookie.svelte";

  export let hide;
</script>

<div class="modal">
  <p>Welcome, dear user!</p>
  <p>My name is MrCookie!</p>
  <p>I can provide you cookies filled with a bit of wisdom.</p>
  <p>Usually, it takes some time to make one, 8 hours to be specific!</p>
  <p>Eat them to get your personal phrase.</p>
  <div class="mr-cookie">
    <MrCookie />
  </div>
  <Button message="Got it!" handleClick={() => hide()} />
</div>

<style>
  .modal {
    display: grid;
    grid-auto-rows: min-content;
    place-items: center;
    row-gap: 0.25em;
  }

  .mr-cookie {
    justify-self: end;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    width: 75px;
  }

  p {
    place-self: start;
  }
</style>
