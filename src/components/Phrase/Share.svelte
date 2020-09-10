<script lang="ts">
  import { getContext } from "svelte";

  import type { Phrase, PhraseIDString } from "#types";

  import notificationsCentre from "@components/notification/index";
  import { encrypt } from "@util/encryptNumber";

  import Button from "@components/controls/Button.svelte";

  const phrase: Phrase = getContext("phrase");

  async function sharePhrase(): Promise<void> {
    // Try Web Share API
    if (navigator.share) {
      try {
        const [ fragment, position ] = phrase.id;

        await navigator.share({
          title: `Phrase from ${phrase.author}`,
          text: `${phrase.body}. Visit ${window.location.origin} for more!`,
          url: `${window.location.origin}/#/phrase/${encrypt(fragment)}/${encrypt(position, 1618033789784537)}`
        });

        notificationsCentre.addNotification({
          type: "success",
          text: "Shared successfully!",
          position: "bottom-right",
          removeAfter: 3500
        });
      } catch (error) {
        console.error("Something is wrong:", error);
      }

      return;
    }

    notificationsCentre.addNotification({
      type: "warning",
      text: "Your browser do not have this functionality yet.",
      position: "bottom-right",
      removeAfter: 2000
    });
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
<Button handleClick={sharePhrase} tooltip="Share" transparent>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
      <path d="M80.21,31.25A15.63,15.63,0,1,1,95.83,15.63,15.65,15.65,0,0,1,80.21,31.25Zm0-25a9.38,9.38,0,1,0,9.37,9.38A9.39,9.39,0,0,0,80.21,6.25Z" />
      <path d="M80.21,100A15.63,15.63,0,1,1,95.83,84.38,15.65,15.65,0,0,1,80.21,100Zm0-25a9.38,9.38,0,1,0,9.37,9.38A9.39,9.39,0,0,0,80.21,75Z" />
      <path d="M19.79,65.62A15.62,15.62,0,1,1,35.42,50,15.63,15.63,0,0,1,19.79,65.62Zm0-25A9.38,9.38,0,1,0,29.17,50,9.38,9.38,0,0,0,19.79,40.63Z" />
      <path d="M30.67,47a3.12,3.12,0,0,1-1.55-5.84l38.66-22a3.13,3.13,0,0,1,3.1,5.43l-38.67,22A3.17,3.17,0,0,1,30.67,47Z" />
      <path d="M69.33,81.33a3.07,3.07,0,0,1-1.54-.41l-38.67-22a3.13,3.13,0,0,1,3.1-5.43l38.66,22a3.12,3.12,0,0,1-1.55,5.84Z" />
  </svg>
</Button>

<style>
  svg {
    fill: var(--color-3);
    width: 100%;
    height: 100%;
  }
</style>
