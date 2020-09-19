<script lang="ts">
  import Cookie from "@app/Cookie";
  import User from "@src/app/User";
  import type { CookieClassType, CookieIndex } from "#types";

  import modal from "@stores/modal.js";
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  import notificationsCentre from "@components/notification/index";

  import CookieButton from "@components/svg/Cookie.svelte";
  import Countdown from "@components/Countdown.svelte";

  let dispatch = createEventDispatcher();

  export let index: CookieIndex = 0;
  let eaten: boolean = false;
  let timeout;

  function setTimer(time) {
    timeout = setTimeout(() => {
      eaten = false;
    }, time);
  }

  /* set cookie readiness */
  onMount(async () => {
    const status = await Cookie.getCookieStatus(index);
    eaten = !status;

    // if cookie is not ready, set a timer to update
    if (!status) {
      const timeLeft = await Cookie.getCookieTime(index);
      setTimer(timeLeft);
      return () => clearTimeout(timeout);
    }
  });

  async function crackCookie() {
    if (eaten) {
      modal.set({
        show: true,
        title: "Baking time!",
        contents: Countdown,
        props: {
          timestamp: await Cookie.getCookieTime(index)
        }
      });
      return;
    }

    dispatch("eatingcookie", { index });
    eaten = !eaten;
    setTimer(Cookie.COOKIE_TIME);

    // show how many cookies are still available
    const uniqueCookies = await User.getUniqueCookies();

    notificationsCentre.addNotification({
      type: "success",
      text: `There are left ${uniqueCookies} for you!`,
      position: "bottom-right",
      removeAfter: 2000
    });
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<!--
  @component
  Cookie presentational component.
  Provides an action to "consume" or "break" the cookie to get a new phrase.

  Props:
    - index: the index of this particular cookie,
    - eatingCookieEvent: custom event for "eating" a cookie.

  State:
    - timestamp: the timeout id for this cookie,
    - ready: readyness of cookie to be consumed.

  Cookie can be "consumed" and be ready to be "consumed". 
  If cookie is consumed, it should have a particular visual state and do not
  let the user to generate a new phrase. Instead, if cookie is not ready yet,
  the phrase this cookie gave upon being consumed is being rendered on a screen.

  To prevent "realoding the page" reset, onMount asynchronously reads IDB to check
  the cookie state and gets a timestamp which sets the readyness state with setTimeout.

  Similarly, when user "consume the cookie", the setTimeout action being scheduled to make
  cookie ready without reloading the page.

  To prevent leaks, the timeout state variable is used to clear all active setTimeout intervals.
-->
<CookieButton
  size="50px"
  handleClick={crackCookie}
  {eaten}
/>
