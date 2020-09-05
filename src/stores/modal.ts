import { writable } from "svelte/store";
import type { Modal } from "#types";

function modal() {
  const { subscribe, set } = writable({ show: false } as Modal);

  return {
    subscribe,
    set: ({ title, contents, props }: Modal) => set({
      show: true,
      title,
      contents,
      props
    }),
    hide: () => set({ show: false } as Modal)
  };
}

export default modal();
