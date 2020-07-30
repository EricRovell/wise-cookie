import { writable } from "svelte/store";

function modal() {
  const { subscribe, set } = writable({
    show: false
  });

  return {
    subscribe,
    set: ({ title, contents, props }) => set({
      show: true,
      title,
      contents,
      props
    }),
    hide: () => set({
      show: false
    })
  };
}

export default modal();
