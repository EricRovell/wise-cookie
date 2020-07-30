<script>
  import { getContext } from "svelte";

  const phrase = getContext("phrase");
</script>

<!--
  @component
  Anchor component.

  Getting data using context with "phrase" key.
  Data is the phrase object { id, author, body }.
  Component only uses "id" field which presents some part of URL.

  Phrase ID construct: category_name/pack_number/phrase_position
  Example: thoughts/0/14

  Entire Phrase URL is: #/phrase/:id
-->
<a href={`#/phrase/${phrase.id}`} title="Phrase URL">
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg" >
      <path d="M24.24,100A24.23,24.23,0,0,1,7.11,58.62l9-9a33.78,33.78,0,0,0,1,8.34l-6,6A17.62,17.62,0,0,0,36,89L62.1,62.81a17.65,17.65,0,0,0-6.52-29l5-5a23.69,23.69,0,0,1,8.09,6.64,24.56,24.56,0,0,1,4.67,10.26,23.9,23.9,0,0,1-6.3,21.5c-.49.49-.58.59-.62.64L41.38,92.89A24.05,24.05,0,0,1,24.24,100Z" />
      <path d="M39.41,71.19A24.37,24.37,0,0,1,26.63,54.24,23.85,23.85,0,0,1,33,32.79L58.64,7.09A24.23,24.23,0,1,1,92.91,41.36L84,50.29A34.87,34.87,0,0,0,82.91,42l5.32-5.32A17.62,17.62,0,1,0,63.32,11.76L37.15,37.93a17.65,17.65,0,0,0,6.56,29Z" />
  </svg>
</a>

<style>
  a {
    display: block;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    place-items: center;
  }

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