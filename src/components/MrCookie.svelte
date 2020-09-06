<script lang="ts">
  import type { MrCookieType } from "#types";

  export let type: MrCookieType = "clever";
  export let handleClick = () => window.scrollTo(0, 0);
</script>

<picture on:click={handleClick}>
  <source srcset={`/images/cookie-${type}.webp`} type="image/webp" alt="Mr.Cookie">
  <img src={`/images/cookie-${type}.png`} type="image/png" alt="Mr.Cookie">
</picture>

<!--
  @component
  The mascot of the application.
-->
<style>
  picture {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  picture img {
    width: 100%;
    height: 100%;
  }
</style>
