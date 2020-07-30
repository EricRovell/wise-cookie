<script>
  import App from "@stores/app.js";
  import modal from "@stores/modal.js";
  import { onMount, onDestroy } from "svelte";

  import Countdown from "@components/Countdown.svelte";

  export let index = 0;
  export let eatingCookieEvent;

  let ready = true;

  let timeout;

  function setTimer(time) {
    timeout = setTimeout(() => {
      ready = true;
    }, time);
  }

  /* set cookie readiness */
  onMount(async () => {
    const { status, timestamp } = await $App.db.timestampStatus(index);
    ready = status;

    // if cookie is not ready, set a timer to update
    if (!status) {
      setTimer(Date.now() - timestamp);
      return () => clearTimeout(timeout);
    }
  });

  async function crackCookie() {
    eatingCookieEvent(index);

    if (ready) {
      ready = !ready;
      setTimer($App.db.COOKIE_TIME);
    }
  }

  async function showTime() {
    if (!ready) {
      modal.set({
        title: "Countdown",
        contents: Countdown,
        props: {
          timestamp: await $App.db.getTimeLeft(index)
        }
      });
    }
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
<div
  class:ready
  on:click={showTime}
  on:click={crackCookie}  
/>

<style>
  div {
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
    transition:
      transform 0.4s ease-in-out
      background 0.4s ease-in-out;

    transform: scale(0.8);

    cursor: pointer;
  }

  .ready {
    background: var(--color-3);
    transform: scale(1);
  }
</style>