import { writable } from 'svelte/store';

export const
  popuptext = writable(''),
  latlng = writable(''),
  copy = (text, store) => {
		navigator.clipboard.writeText(text)
			.then(() => console.info(text))
			.catch(r => console.error('clipboard write failed: '+r));
    if (store)  store.set(text);
  };
