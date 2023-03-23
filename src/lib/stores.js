import { writable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import PocketBase from 'pocketbase';

const
  version = 202302,
  noop    = () => console.error('No Storage!'),
  session = browser ? localStorage : { getItem:noop, setItem:noop, clear:noop }, // mock storage on server
  apiURL  = browser && !dev ? location.origin+'/api' : 'http://localhost:8090',
  stored  = session.getItem('version')

export const
  latlng  = writable(''),
  payload = writable(null),
  zoom    = writable(0),
  pid     = writable(session.getItem('pid') || ''),
  pb      = new PocketBase(apiURL),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  round = n => Number(n).toFixed(5),

  save = obj => session.setItem(obj.id, obj.value),
  load = obj => obj.value = session.getItem(obj.id) || obj.value;

pb || console.error(pb)
pid.subscribe(value => {session.setItem('pid', value || '')})  // store record id; strings only!

if (browser && version != stored) { // storage should be reset + store new version id
  session.clear()
  session.setItem('version', version)
  console.log('storage cleared', stored, version)
}
// payload.subscribe(value => browser && value && navigator.clipboard?.writeText(value)) // also copy to clipboard
