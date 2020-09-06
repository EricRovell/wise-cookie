<script lang="ts">
  import { onMount } from "svelte";

  import User from "@app/User";
  import type { UserClassType, Theme } from "#types";

  import notificationsCentre from "@components/notification/index";

  let light = true; // toggled -> chosen light (defaults)
  $: currentTheme = light ? "light" : "dark" as Theme;
  $: href = `themes/${currentTheme}.css`;
  

  onMount(async () => {
    const theme: Theme = await User.getPreferredTheme();

    // no records -> get info from browser, otherwise convert to bool
    light = (theme === "none") 
      ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
      : (theme === "light");
  });

  async function rememberTheme() {
    await User.changeTheme(currentTheme);

    notificationsCentre.addNotification({
      type: "success",
      text: `Theme successfully set to ${currentTheme}.`,
      position: "bottom-right",
      removeAfter: 1500
    });
  }
</script>

<svelte:head>
  <link rel="stylesheet" {href}>
</svelte:head>

<!--
  @component
  Provides an action to change the application theme.
  The component itself uses checkbox input under the hood which is hidden.

  State:
    - toggled = false

  By default is not toggled and hence the default theme is "light":
    - false -> "light"
    - true -> "dark"

  The href of the stylesheet is being constructed from toggled state:
  "/themes/:theme.css"

  On change remember the choice and writes to IDB.
  On mount sets the users latest choice or preferenced theme if possible.
-->
<label>
  <input type="checkbox" bind:checked={light} on:change={rememberTheme}>
  <div class="planet" />
  <div class="elements">
    {#each new Array(8) as _}
      <svg viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="200" />
      </svg>
    {/each}
  </div>
</label>

<style>
  label {
    --size: 35px;
    --factor: calc(0.25 * var(--size));

    --bg-planet-bright: #F2C94C;
    --bg-planet-shadow: #828894;
    --bg-planet-lightshadow: #D7D7D820;

    cursor: pointer;
    padding: var(--factor);
    position: relative;

    /* To make outline on mobile invisible */
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
  }

  input {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
  }

  .planet {
    width: calc(2 * var(--factor));
    height: calc(2 * var(--factor));
    border-radius: 50%;
    overflow: hidden;
    background: radial-gradient(calc(3.75 * var(--factor)), 99%, transparent 100%);
    background-color: var(--bg-planet-bright);
    background-repeat: no-repeat;
    position: relative;
    transition: all 400ms ease;

    /* Safari transition issue */
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }

  .planet::after {
    content: "";
    background-color: var(--bg-planet-shadow);
    width: calc(2 * var(--factor));
    height: calc(2 * var(--factor));
    position: absolute;
    border-radius: 50%;
    will-change: opacity, transform, background-color;
    opacity: 0;
    transform: translate(calc(2 * var(--factor)), calc(-2 * var(--factor)));
    transition:
      opacity 400ms ease,
      transform 400ms ease,
      background-color 400ms ease;
  }

  .elements {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 400ms ease;
  }

  svg {
    position: absolute;
    width: calc(0.45 * var(--factor));
    height: calc(0.45 * var(--factor));
    opacity: 1;
    transition:
      transform 400ms ease,
      opacity 200ms ease,
      width 200ms ease,
      height 200ms ease;
  }

  svg circle {
    fill: var(--bg-planet-bright);
    transition: fill 400ms ease;
  }

  svg:first-child {
    transform: translate(calc(1.8 * var(--factor)), calc(0.35 * var(--factor)));
  }
  svg:nth-child(2) {
    transform: translate(calc(2.8 * var(--factor)), calc(0.7 * var(--factor)));
  }
  svg:nth-child(3) {
    transform: translate(calc(3.2 * var(--factor)), calc(1.8 * var(--factor)));
  }
  svg:nth-child(4) {
    transform: translate(calc(2.8 * var(--factor)), calc(2.8 * var(--factor)));
  }
  svg:nth-child(5) {
    transform: translate(calc(1.8 * var(--factor)), calc(3.2 * var(--factor)));
  }
  svg:nth-child(6) {
    transform: translate(calc(0.7 * var(--factor)), calc(2.8 * var(--factor)));
  }
  svg:nth-child(7) {
    transform: translate(calc(0.35 * var(--factor)), calc(1.8 * var(--factor)));
  }
  svg:nth-child(8) {
    transform: translate(calc(0.7 * var(--factor)), calc(0.7 * var(--factor)));
  }

  /* checked */

  input:checked + .planet {
    --bg-planet-bright: #D7D7D8;
  }

  input:checked + .planet::after {
    opacity: 1;
    transform: translate(calc(0.6 * var(--factor)), calc(-0.5 * var(--factor)));
  }

  input:checked ~ .elements {
    transform: rotate(180deg);
  }

  input:checked ~ .elements svg:first-child {
    transform: translate(calc(2 * var(--factor)), var(--factor));
    opacity: 0;
  }
  input:checked ~ .elements svg:nth-child(2) {
    transform: translate(calc(3 * var(--factor)), calc(1.5 * var(--factor)));
    opacity: 0;
  }
  input:checked ~ .elements svg:nth-child(3) {
    transform: translate(calc(3 * var(--factor)), calc(2 * var(--factor)));
    opacity: 0;
  }
  input:checked ~ .elements svg:nth-child(4) {
    transform: translate(calc(3 * var(--factor)), calc(2 * var(--factor)));
    opacity: 0;
  }
  input:checked ~ .elements svg:nth-child(5) {
    transform: translate(calc(1.9 * var(--factor)), calc(2.6 * var(--factor)));
    width: calc(0.3 * var(--factor));
    height: calc(0.3 * var(--factor));
  }
  input:checked ~ .elements svg:nth-child(5) circle {
    fill: var(--bg-planet-lightshadow);
  }
  input:checked ~ .elements svg:nth-child(6) {
    transform: translate(calc(1.4 * var(--factor)), calc(2.5 * var(--factor)));
    width: calc(0.3 * var(--factor));
    height: calc(0.3 * var(--factor));
  }
  input:checked ~ .elements svg:nth-child(6) circle {
    fill: var(--bg-planet-lightshadow);
  }
  input:checked ~ .elements svg:nth-child(7) {
    transform: translate(calc(1.1 * var(--factor)), calc(1.6 * var(--factor)));
    width: calc(0.7 * var(--factor));
    height: calc(0.7 * var(--factor));
  }
  input:checked ~ .elements svg:nth-child(7) circle {
    fill: var(--bg-planet-lightshadow);
  }
  input:checked ~ .elements svg:nth-child(8) {
    width: calc(0.45 * var(--factor));
    height: calc(0.45 * var(--factor));
    transform: translate(calc(1.7 * var(--factor)), calc(2.1 * var(--factor)));
  }
  input:checked ~ .elements svg:nth-child(8) circle {
    fill: var(--bg-planet-lightshadow);
  }
</style>