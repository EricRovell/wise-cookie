<script>
  import { onMount } from "svelte";
  import App from "@stores/app.js";

  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
  import MrCookie from "@components/MrCookie.svelte";
  import CookiePhrases from "@components/CookiePhrases.svelte";
  
  import modal from "@stores/modal.js";
  import Library from "@components/modals/Library.svelte";
  import Greetings from "@components/modals/Greetings.svelte";

  function dialogue() {
    modal.set({
      title: "Mr. Cookie",
      contents: Library
    });
  }

  onMount(async () => {
    const userGuest = await $App.db.userGuest();

    if (userGuest) {
      modal.set({
        title: "Greetings!",
        contents: Greetings
      });
    }  
  });
</script>

<svelte:head>
  <title>Wise Cookie: A little kitchen of wisdom and inspiration!</title>
</svelte:head>

<FadingWrapper>
  <div class="container">
    <CookiePhrases />
    <div class="mr-cookie">
      <MrCookie
        handleClick={dialogue}
        type={Math.random() > 0.5 ? "clever" : "glasses"} />
    </div>
  </div>
</FadingWrapper>

<style>
  .container {
    display: grid;
    grid-template: 1fr / 1fr 250px;
    place-items: start center;
    column-gap: 2.25em;
  }

  .mr-cookie {
    position: sticky;
    top: 10px;
    width: 275px;
    height: 275px;
  }

  @media screen and (max-width: 720px) {
    .container {
      display: grid;
      grid-template: min-content 1fr / 1fr;
      place-items: start center;
      column-gap: 2.25em;
    }

    .mr-cookie {
      place-self: end;
      position: sticky;
      bottom: 10px;
      right: 15px;
      width: 25vw;
      height: 25vw;
      margin-top: 20px;
    }
  }
</style>
