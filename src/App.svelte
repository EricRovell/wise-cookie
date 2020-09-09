<script lang="ts">
  import Cookie from "@app/Cookie";

  import Router from "svelte-spa-router/Router.svelte";
  import routes from "@routes/routes";

  import LayoutMain from "@src/layout/LayoutMain.svelte";
  import Modal from "@components/Modal.svelte";
  import Notifications from "@components/notification/Notifications.svelte";
</script>

<!--
  @component
  Root component of the Application.

  Includes:
    - Layout component with Routing Logic inside of it,
    - Modal wrapper that gets content from the store.

  Sets the global context of Cookie class instance with "cookie" key.
  Cookie class provides all necessary methods to work with data,
  specifically cookies and phrases.
-->
<LayoutMain>
  <Router {routes} />
</LayoutMain>
<Modal />
<Notifications />