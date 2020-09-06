<script>
  import { onDestroy } from "svelte";

  import notificationCentre from "./index";

  export let item;
  export let notification = {};
  export let withoutStyles = false;

  const { id, removeAfter } = notification;

  const removeNotificationHandler = () => notificationCentre.removeNotification(id);

  let timeout = null;

  if (removeAfter) {
    timeout = setTimeout(removeNotificationHandler, removeAfter);
  }
  
  onDestroy(() => {
    if (removeAfter && timeout) clearTimeout(timeout);
  });
</script>

<svelte:component
  this={item}
  {notification}
  {withoutStyles}
  onRemove={removeNotificationHandler}
/>