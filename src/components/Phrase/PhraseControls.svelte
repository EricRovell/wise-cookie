<script>
  import Like from "@components/Phrase/Like.svelte";
  import Share from "@components/Phrase/Share.svelte";
  import Copy from "@components/Phrase/Copy.svelte";
  import Link from "@components/Phrase/Link.svelte";
</script>

<!--
  @component
  Phrase controls bar.
  A wrapper for phrase action elements.

  Control bar elements:
    - Like: saving/removing phrase to/from favourites,
    - Share: sharing the phrase contents to the web OR copying the URL to this phrase,
    - Copy: copying into the clipboard the contents of the phrase,
    - Link: providing and anchor to this specific phrase.
-->
<div>
  {#each [ Like, Share, Copy, Link ] as ControlButton}
    <ControlButton />
  {/each}
</div>

<style>
  div {
    --size: 1.5em;

    display: grid;
    grid-template: var(--size) / repeat(4, var(--size));
  }
</style>
