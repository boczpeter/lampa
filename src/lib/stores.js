import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const session = browser && sessionStorage;
export const
  latlng    = writable(''),
  clipboard = writable(''),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node?.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  save = obj => session && session.setItem(obj.id, obj.value),
  load = obj => obj.value = session && session.getItem(obj.id) || obj.value
;

clipboard.subscribe(value => browser && value && navigator.clipboard?.writeText(value));
