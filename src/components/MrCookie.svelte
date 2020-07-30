<script>
  import modal from "@stores/modal.js";
  import Library from "@components/modals/Library.svelte";

  function dialogue() {
    modal.set({
      title: "Information from MrCookie",
      contents: Library
    });
  }
</script>

<picture on:click={dialogue}>
  <source srcset="/images/ChocolateChipCookie.webp" type="image/webp" alt="Mr.Cookie">
  <img src="/images/ChocolateChipCookie.png" type="image/png" alt="Mr.Cookie">
</picture>

<!--
  @component
  The mascot of the application.
-->
<style>
  picture {
    position: sticky;
    top: 10px;

    width: 275;
    height: 275px;
  }

  picture img {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 720px) {
    picture {
      place-self: end end;
      bottom: 10px;

      width: 40vw;
      height: 40vw;
    }
  }
</style>