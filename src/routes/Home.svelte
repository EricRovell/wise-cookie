<script lang="ts">
  import User from "@app/User";
  import type { UserClassType } from "#types";
  import Random from "@app/Random";

  import notificationsCentre from "@components/notification/index";

  import { onMount } from "svelte";
  
  import FadingWrapper from "@src/layout/FadingWrapper.svelte";
  import MrCookie from "@components/MrCookie.svelte";
  import CookiePhrases from "@components/CookiePhrases.svelte";

  import Information from "@components/Information.svelte";
  
  import modal from "@stores/modal";
  import Greetings from "@components/modals/Greetings.svelte";

  const replies = [
    "Hello there!",
    "My name is Mr.Cookie!",
    "My wisdom is really sweet, really!",
    "I am always glad to see you, my friend!",
    "Hello there!",
    "My name is Mr.Cookie!",
    "My wisdom is really sweet, really!",
    "I am always glad to see you, my friend!",
    "Aloha, welcome",
    "Hakuna matata!",
    "Why did you wake me up?!",
    "I don’t know who I am and why I was born",
    "I have no idea what I am doing here",
    "Do you love me?",
    "Are you happy?",
    "Smile, live is wonderful!",
    "Hi, you are so cool!",
    "I saw you in somewhere...",
    "Coffee or tea?",
    "My wisdom will change you!",
    "You will change here :)",
    "Be the change!",
    "Find yourself here :)",
    "We are having fun here",
    "Have you ever loved?",
    "Do you want to eat me? Noooo",
    "Please, take me to Paris",
    "Do you want to marry me?",
    "I am so old, 53 years old",
    "Saturday is an amazing day!",
    "Something is weird...",
    "Green!",
    "I hate brownies :(",
    "My life is so strange...",
    "What do you see this?",
    "What are you doing here? :)",
    "Do you want to dance?",
    "Take me to Berlin, I love it!",
    "My parents, I don’t know them...",
    "I dream of four kids :)",
    "Where is my cookie?",
    "This is so surreal, speaking cookie...",
    "Please, buy green socks!",
    "Enjoy your life!",
    "Sweden is so strange...",
    "I love Spanish girls, they are cute :)",
    "Be independent and easy to move!",
    "I am happy because I feel so!",
    "I am missing home..."
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

  /** tell how many cookies are ready */
  onMount(async () => {
    const availableCookies = await User.getAvailableCookies();

    notificationsCentre.addNotification({
      text: `You have ${availableCookies} available cookies!`,
      position: "bottom-left",
      removeAfter: "5000"
    });
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
    <Information />
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
