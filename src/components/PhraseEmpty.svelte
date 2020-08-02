<script>
  export let title = "Please, eat a \u{1F36A}";
</script>

<article>
  <p>{title}</p>
</article>

<style>
  article {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1em;
    background: var(--card-bg);
    border-radius: 5px;

    user-select: none;
    cursor: pointer;
  }
</style>