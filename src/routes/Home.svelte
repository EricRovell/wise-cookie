<script lang="ts">
  import User from "@app/User";
  import type { UserClassType } from "#types";
  import Random from "@app/Random";

  import notificationsCentre from "@components/notification/index";

  import { onMount } from "svelte";
  
  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
  import MrCookie from "@components/MrCookie.svelte";
  import CookiePhrases from "@components/CookiePhrases.svelte";
  
  import modal from "@stores/modal";
  import Greetings from "@components/modals/Greetings.svelte";

  const replies = [
    "Hello there!",
    "My name is Mr.Cookie!",
    "My wisdom is really sweet, really!",
    "I am always glad to see you, my friend!"
  ];

  /**
   * Tels how much unique cookies are left for a user.
   */
   async function dialogue() {
    const reply = (Random.randFloat() > 0.25)
      ? Random.randArrElement(replies)
      : `You have ${await User.getUniqueCookies()} of unique cookies!`;

    notificationsCentre.addNotification({
      text: reply,
      position: "bottom-left",
      removeAfter: "2000"
    });
  }

  /**
   * Resolves the user status and shows the Greeting Modal for a new user.
   */
  onMount(async () => {
    const userStatus = await User.resolveUserStatus();

    if (!userStatus) {
      modal.set({
        show: true,
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
    width: 100%;
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
