<script>
  import User from "@app/User";
  import { heartExplode } from "@util/heartExplodeAnim";

  import Button from "@components/controls/Button.svelte";

  import { getContext, onMount } from "svelte";
  import notificationsCentre from "@components/notification/index";
  
  const phrase = getContext("phrase");

  const container = document.querySelector("#animation-container");

  let liked = false;

  async function rememberQuote(event) {
    const operationStatus = await User.markFavouritePhrase(phrase);  
    liked = !liked;

    let type;
    let text;

    switch(operationStatus) {
      case "added":
      type = "success";
      text = "Phrase successfully added to the favourite list."
        break;
      case "removed":
      type = "warning";
      text = "Phrase successfully removed to the favourite list."
        break;
      case "error":
      type = "danger";
      text = "Something is wrong. Please, try again later."
        break;
    }

    // animate if added to favourites
    // no sense if removed
    if (liked) {
      heartExplode(event, container);
    }

    notificationsCentre.addNotification({
      type,
      text,
      position: "bottom-right",
      removeAfter: 1500
    });
  }

  onMount(async () => {
    if (phrase.id) {
      liked = await User.getPhraseFavouriteStatus(phrase.id);
    }
  });
</script>

<!--
  @component
  Provides an action to add/remove phrase as favourite.

  Getting data using context with "phrase" key.
  Data is the phrase object { id, author, body }.

  Has "liked" boolean state.

  On mount asynchronously checks if the phrase a favourite one.
-->
<Button handleClick={rememberQuote} tooltip="Save to favourites" transparent>
  <svg viewBox="0 0 100 100" class:liked>
    <path d="M98,36.29c0,23.54-40.18,47.89-48,52.36C42.16,84.05,2,59.57,2,36.29A24.89,24.89,0,0,1,26.86,11.4,24.35,24.35,0,0,1,47.7,22.63a2.84,2.84,0,0,0,4,.63,2.69,2.69,0,0,0,.63-.63A24.89,24.89,0,0,1,98,36.29Z" />
    <path d="M71.65,8.61h0A28.08,28.08,0,0,0,50,18.61a27.7,27.7,0,0,0-21.65-10A28.35,28.35,0,0,0,0,37C0,63.8,46.84,90,48.73,91a2.3,2.3,0,0,0,2.54,0C53.16,90,100,64.18,100,37A28.35,28.35,0,0,0,71.65,8.61ZM50,86C42.66,81.64,5.06,58.73,5.06,37A23.29,23.29,0,0,1,28.35,13.67a22.8,22.8,0,0,1,19.5,10.51,2.66,2.66,0,0,0,3.71.59,2.75,2.75,0,0,0,.59-.59A23.29,23.29,0,0,1,94.94,37C94.94,59,57.34,81.77,50,86Z" />
  </svg>
</Button>

<style>
  svg {
    fill: var(--color-3);
    width: 100%;
    height: 100%;
  }

  svg path:first-of-type {
    fill: none;
  }

  .liked path:first-of-type {
    fill: var(--color-3);
  }

  :global(particle) {
    border-radius: 50%;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    opacity: 0;
  }
</style>
  