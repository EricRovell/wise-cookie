<script>
  import { getContext } from "svelte";
  import copyToClipboard from "@util/clipboard.js";

  export let title = "Share";

  const phrase = getContext("phrase");

  async function sharePhrase() {
    // Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Phrase from ${phrase.author}`,
          text: phrase.body,
          url: `#/phrase/${phrase.id}`
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    // Copy URL otherwise
    } else {
      copyToClipboard(`/phrase/${phrase.id}`);
    }
  }
</script>

<!--
  @component
  Share the phrase component.

  Getting data using context with "phrase" key.
  Data is the phrase object { id, author, body }.

  Sharing process uses Web Share API which is not widely supported.

  In case of no support, simply copies phrase URL to clipboard.

  Phrase ID construct: category_name/pack_number/phrase_position
  Example: thoughts/0/14

  Entire Phrase URL is: #/phrase/:id
-->
<svg
  viewBox="0 0 100 100"
  on:click={sharePhrase}
  xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <path d="M80.21,31.25A15.63,15.63,0,1,1,95.83,15.63,15.65,15.65,0,0,1,80.21,31.25Zm0-25a9.38,9.38,0,1,0,9.37,9.38A9.39,9.39,0,0,0,80.21,6.25Z" />
    <path d="M80.21,100A15.63,15.63,0,1,1,95.83,84.38,15.65,15.65,0,0,1,80.21,100Zm0-25a9.38,9.38,0,1,0,9.37,9.38A9.39,9.39,0,0,0,80.21,75Z" />
    <path d="M19.79,65.62A15.62,15.62,0,1,1,35.42,50,15.63,15.63,0,0,1,19.79,65.62Zm0-25A9.38,9.38,0,1,0,29.17,50,9.38,9.38,0,0,0,19.79,40.63Z" />
    <path d="M30.67,47a3.12,3.12,0,0,1-1.55-5.84l38.66-22a3.13,3.13,0,0,1,3.1,5.43l-38.67,22A3.17,3.17,0,0,1,30.67,47Z" />
    <path d="M69.33,81.33a3.07,3.07,0,0,1-1.54-.41l-38.67-22a3.13,3.13,0,0,1,3.1-5.43l38.66,22a3.12,3.12,0,0,1-1.55,5.84Z" />
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
