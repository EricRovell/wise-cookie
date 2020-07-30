<script>
  import Star from "@components/svg/Star.svelte";
  import Share from "@components/svg/Share.svelte";
  import Copy from "@components/svg/Copy.svelte";
  import Link from "@components/svg/Link.svelte";
</script>

<!--
  @component
  Phrase controls bar.
  A wrapper for phrase action elements.

  Control bar elements:
    - Star: saving/removing phrase to/from favourites,
    - Share: sharing the phrase contents to the web OR copying the URL to this phrase,
    - Copy: copying into the clipboard the contents of the phrase,
    - Link: providing and anchor to this specific phrase. 
-->
<div>
  <Star />
  <Share />
  <Copy />
  <Link />
</div>

<style>
  div {
    --size: 1em;

    display: grid;
    grid-template: var(--size) / repeat(4, var(--size));
    column-gap: 0.5em;
  }
</style>
