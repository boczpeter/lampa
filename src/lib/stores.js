import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const
  clipboard = writable(''),
  latlng    = writable(null),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node && node.querySelectorAll(sel).forEach(a => Object.assign(a, {rel:'external noopener', target:'_blank'}));

clipboard.subscribe(value => browser && value && navigator.clipboard?.writeText(value));
