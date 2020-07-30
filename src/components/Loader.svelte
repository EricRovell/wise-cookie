<script>
  import { fade } from "svelte/transition";
</script>

<div transition:fade>
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 27">
    <title>Untitled-1</title>
    <path d="M98,2V25H2V2H98m2-2H0V27H100V0Z"/>
    <text
      x="50%"
      y="50%"
      dominant-baseline="middle"
      text-anchor="middle"
      style="font-size: 10px;font-family: MyriadPro-Regular, Myriad Pro">
        Loading...
    </text>
    <path d="M98,2V25H2V2H98m2-2H0V27H100V0Z"/>
  </svg>
</div>

<style>
  div {
    width: 100%;
  }

  svg {
    width: 120px;
    height: 50px;
  }

  text {
    color: var(--color-3);
  }
</style>