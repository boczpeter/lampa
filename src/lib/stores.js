import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import PocketBase from 'pocketbase';

const
  version = 202302,
  session = browser ? localStorage : null,
  stored = session?.getItem('version')

export const
  latlng  = writable(''),
  payload = writable(''),
  zoom    = writable(0),
  pb      = new PocketBase('http://127.0.0.1:8090'),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  round = n => Number(n).toFixed(5),

  save = obj => session?.setItem(obj.id, obj.value),
  load = obj => obj.value = session?.getItem(obj.id) || obj.value;

// console.debug(pb)
if (version != stored) { // storage should be reset + store new version id
  console.log(stored, version)
  session?.clear()
  session?.setItem('version', version)
}

// payload.subscribe(value => browser && value && navigator.clipboard?.writeText(value)) // also copy to clipboard
