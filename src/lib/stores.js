import { writable } from 'svelte/store';

export const
  popuptext = writable(''),

  latlng    = writable(null),

  // copy text to clipboard
  copy = text => navigator.clipboard?.writeText(text)
			.then(() => console.info(text))
			.catch(r => console.error('clipboard write failed: '+r)),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node && node.querySelectorAll(sel).forEach(a => Object.assign(a, {rel:'external', target:'_blank'}));
