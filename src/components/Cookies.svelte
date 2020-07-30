<script>
  import { createEventDispatcher } from "svelte";
  import Cookie from "@components/Cookie.svelte";

  let dispatch = createEventDispatcher();

  function eatingCookieEvent(index) {
    dispatch("eatingcookie", {
      index
    });
  }

  const data = [
    { index: 0 },
    { index: 1 },
    { index: 2 }
  ];
</script>

<div>
  {#each data as cookie}
    <Cookie {...cookie} {eatingCookieEvent} />
  {/each}
</div>

<style>
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
