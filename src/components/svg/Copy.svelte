<script>
  import copyToClipboard from "@util/clipboard.js";

  import { getContext } from "svelte";
  const phrase = getContext("phrase"); 
</script>

<!--
  @component
  Copying phrase to clipboard on click.

  Getting data using context with "phrase" key.
  Data is the phrase object { id, author, body }.

  Copy to clipboard algorithm uses Navigator.clipboard API.
  If not supported it temporarily creates dummy input to copy text.
-->
<svg
  viewBox="0 0 100 100"
  on:click={() => copyToClipboard(phrase.toString())}
  xmlns="http://www.w3.org/2000/svg">
    <title>Copy</title>
    <path d="M64.36,17.49H17.87A7.91,7.91,0,0,0,10,25.39V92.1a7.91,7.91,0,0,0,7.91,7.9H64.36a7.9,7.9,0,0,0,7.9-7.9V25.39A7.93,7.93,0,0,0,64.36,17.49Zm2.35,74.58a2.37,2.37,0,0,1-2.37,2.38H17.85a2.38,2.38,0,0,1-2.38-2.38V25.39A2.38,2.38,0,0,1,17.85,23H64.34a2.37,2.37,0,0,1,2.37,2.37Z" />
    <path d="M82.13,0H35.64a7.9,7.9,0,0,0-7.9,7.9,2.77,2.77,0,1,0,5.53,0,2.37,2.37,0,0,1,2.37-2.37H82.13A2.38,2.38,0,0,1,84.51,7.9V74.61A2.38,2.38,0,0,1,82.13,77a2.77,2.77,0,0,0,0,5.53A7.91,7.91,0,0,0,90,74.61V7.9A7.91,7.91,0,0,0,82.13,0Z" />
</svg>

<style>
  svg {
    fill: var(--color-3);
    width: 100%;
    height: 100%;
    transition: transform 0.15s ease-in-out;
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.1);
  }

  svg:active {
    transform: scale(0.75);
  }
</style>
