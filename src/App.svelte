<script>
  import Router from "svelte-spa-router";
  import routes from "@routes/routes.js";

  import LayoutMain from "@src/layout/LayoutMain.svelte";
  import Modal from "@components/Modal.svelte";
</script>

<svelte:head>
  <title>Wise Cookie</title>
</svelte:head>

<body>
  <LayoutMain>
    <Router {routes} />
  </LayoutMain>
  <Modal />
</body>
