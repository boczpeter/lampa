import { writable } from 'svelte/store';

export const
  popuptext = writable(''),

  latlng    = writable(null),

  copy = (text, store) => {    // copy text to clipboard and optionally set text value in specified store
		navigator.clipboard.writeText(text)
			.then(() => console.info(text))
			.catch(r => console.error('clipboard write failed: '+r));
    if (store)  store.set(text);
  },
  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node && node.querySelectorAll(sel).forEach(a => Object.assign(a, {rel:'external', target:'_blank'}));
