<script>
  import Button from "@components/controls/Button.svelte";
  import Cookie from "@components/svg/Cookie.svelte";
  import MrCookie from "@components/MrCookie.svelte";

  export let hide;
</script>

<div class="modal">
  <p>Hello, dear friend!</p>
  <p>
    My name is MrCookie!
    I am filled with a bit of wisdom. To get some, eat some cookies!
  </p>
  <p>
    If you need some help, please come <a title="Help page" href="/#/help">here</a>!
  </p>
  <p>
    And of course, we are privacy focused, read about it <a title="Help page" href="/#/help">here</a> and <a title="Privacy page" href="/#/privacy">here</a>.
  </p>
  <div class="mr-cookie">
    <MrCookie />
  </div>
  <Button message="Got it!" handleClick={() => hide()} />
</div>

<style>
  .modal {
    display: grid;
    grid-auto-rows: min-content;
    place-items: center;
    row-gap: 0.25em;
  }

  .mr-cookie {
    justify-self: end;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    width: 75px;
  }

  p {
    place-self: start;
  }
</style>
