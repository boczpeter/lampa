import { writable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import PocketBase from 'pocketbase';

const
  version = 202302,
  prefix  = 'lampa',
  noop    = e => null,
  session = browser ? localStorage : { getItem:noop, setItem:noop, clear:noop } // mock storage on server

export const
  apiURL  = browser && !dev ? location.origin : 'http://localhost:8190',
  latlng  = writable(''),
  payload = writable(null),
  zoom    = writable(0),
  pid     = writable(session.getItem('pid') || ''),
  pb      = new PocketBase(apiURL),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  round = n => Number(n).toFixed(5),

  save = obj => session.setItem(prefix+obj.id, obj.value),
  load = obj => obj.value = session.getItem(prefix+obj.id) || obj.value,

  getVersion = () => session.getItem('version');

if (!pb) { console.error(pb) }
pid.subscribe(value => session.setItem('pid', value || ''))  // store record id; strings only!

if (browser && version != getVersion()) { // storage should be reset + store new version id
  session.clear()
  session.setItem('version', version)
  console.log('storage cleared', version)
}
// payload.subscribe(value => browser && value && navigator.clipboard?.writeText(value)) // also copy to clipboard
