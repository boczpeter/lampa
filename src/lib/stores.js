import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const
  version = 202311,
  prefix  = 'lampa',
  session = browser ? localStorage : null,
  stored = session?.getItem('version')

export const
  latlng    = writable(''),
  clipboard = writable(''),
  zoom      = writable(0),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  round = n => Number(n).toFixed(5),

  save = obj => session?.setItem(prefix+obj.id, obj.value),
  load = obj => obj.value = session?.getItem(prefix+obj.id) || obj.value
;

if (version != stored) { // storage should be reset + store new version id
  console.log(stored, version)
  session?.clear()
  session?.setItem('version', version)
}

clipboard.subscribe(value => browser && value && navigator.clipboard?.writeText(value));
