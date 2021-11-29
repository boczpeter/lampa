import { writable } from 'svelte/store';

export const
  help = writable(false),
  open = writable(false),
  popuptext = writable('');
