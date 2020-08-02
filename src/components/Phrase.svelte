<script>
  import { setContext } from "svelte";
  import { fade } from "svelte/transition";

  import PhraseControls from "@components/PhraseControls.svelte";

  export let phrase;

  setContext("phrase", phrase);
</script>

<!--
  @component
  Visual represention of the phrase object.

  Props:
    - id {string}: the identificator of the phrase,
    - author {string}: the author of the phrase,
    - body {string}: the message of the phrase.

  Component is not reactive, that's why to pass the phrase data it sets
  the context with "phrase" key. 
-->
<article in:fade>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M77.42,17.89A22.89,22.89,0,0,0,54.57,41,23.24,23.24,0,0,0,77.83,64.13l.44,0A29.24,29.24,0,0,1,60,70.55a5.77,5.77,0,0,0-5.77,5.78c0,3.19,2.06,5.78,5.25,5.78C82.09,82.11,100,63.67,100,41v0C100,28.23,90.19,17.89,77.42,17.89Z" />
    <path d="M23.27,17.89A22.91,22.91,0,0,0,.4,41,23.23,23.23,0,0,0,23.65,64.13l.45,0A29.32,29.32,0,0,1,5.76,70.55,5.77,5.77,0,0,0,0,76.33c0,3.19,2.09,5.78,5.28,5.78A40.73,40.73,0,0,0,45.88,41v0C45.88,28.23,36,17.89,23.27,17.89Z" />
  </svg>
  <blockquote>
    {phrase.body}
  </blockquote>
  <div>
    <PhraseControls />
    <span class="author">
      &#8212 {phrase.author}
    </span>
  </div>
</article>

<style>
  article {
    position: relative;

    display: grid;
    grid-template: repeat(2, auto) / 1fr;
    row-gap: 1.25em;

    background: var(--card-bg);
    height: min-content;
    width: 100%;
    padding: 2em 1.5em 1.5em 1.5em;
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 10px;
  }

  svg {
    position: absolute;
    top: -0.75em;
    left: calc(50% - 0.75em);

    fill: var(--color-3);
    width: 1.5em;
    height: 1.5em;
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  .author {
    justify-self: end;
    font-style: italic;
  }
</style>