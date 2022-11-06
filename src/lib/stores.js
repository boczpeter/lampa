import { writable } from 'svelte/store';

export const
  popuptext = writable(''),

  latlng    = writable(null),

  // copy text to clipboard
  copy = async text => await navigator.clipboard?.writeText(text),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node && node.querySelectorAll(sel).forEach(a => Object.assign(a, {rel:'external', target:'_blank'}))
