<script>
  export let eaten = false;
  export let size = "24px";
  export let handleClick = () => eaten = !eaten;
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 98.96 100"
  class:eaten
  on:click={handleClick}
  style="--size: {size};">
  <title>Untitled-1</title>
  <path d="M28.4,5.57A48.86,48.86,0,0,1,50.21.46c1.5,0,3,.07,4.44.2A48.71,48.71,0,0,1,68,3.8a50.74,50.74,0,0,1,5,2.3A49.59,49.59,0,0,1,88.58,18.94c.2.24.4.5.59.75A49.2,49.2,0,1,1,28.4,5.57" transform="translate(-0.52)" style="fill: #cb7c00;isolation: isolate"/>
  <path d="M8.73,42.76A50,50,0,0,1,21.92,8.83,50.1,50.1,0,0,0,50.28,100,49.49,49.49,0,0,0,86.85,83.88a49.28,49.28,0,0,1-28.36,8.93A49.91,49.91,0,0,1,8.73,42.76Z" transform="translate(-0.52)" style="fill: #a26300;isolation: isolate"/>
  <g>
    <ellipse cx="72.54" cy="49.48" rx="3.05" ry="3.06" style="fill: #793c00"/>
    <ellipse cx="41.06" cy="28.05" rx="3.05" ry="3.06" style="fill: #793c00"/>
    <ellipse cx="28.88" cy="68.87" rx="5.08" ry="5.1" style="fill: #793c00"/>
    <ellipse cx="54.26" cy="69.9" rx="6.09" ry="6.12" style="fill: #793c00"/>
    <ellipse cx="87.77" cy="81.12" rx="5.08" ry="5.1" style="fill: #793c00"/>
    <ellipse cx="20.76" cy="11.72" rx="7.13" ry="7.16" style="fill: #793c00"/>
    <ellipse cx="23.8" cy="45.4" rx="7.11" ry="7.14" style="fill: #793c00"/>
    <ellipse cx="27.86" cy="94.39" rx="4.57" ry="4.59" style="fill: #793c00"/>
  </g>
  <path class="bite" d="M89.17,19.69c-.19-.25-.39-.51-.59-.75h0A49.51,49.51,0,0,0,73,6.1c-.79-.42-1.61-.81-2.42-1.19l-.24-.1c-.74-.34-1.5-.66-2.26-1L68,3.8h0A48.3,48.3,0,0,0,54.65.66,10.26,10.26,0,0,0,55,13.06,18.38,18.38,0,0,0,71,40.3a18,18,0,0,0,5.27-.79,13.18,13.18,0,0,0,22-.11A49.33,49.33,0,0,0,89.17,19.69Z" />
  <g>
    <ellipse cx="92.87" cy="17.75" rx="6.09" ry="6.12" style="fill: #793c00"/>
    <ellipse cx="68.74" cy="4.41" rx="4.38" ry="4.41" style="fill: #793c00"/>
    <ellipse cx="66.33" cy="26.24" rx="2.9" ry="2.91" style="fill: #793c00"/>
  </g>
</svg>

<style>
  svg {
    width: var(--size);
    height: var(--size);
    cursor: pointer;
  }

  .bite {
    fill: transparent;
    transition: fill 0.15s ease-in-out;
  }

  .eaten .bite {
    fill: var(--bg);
  }
</style>