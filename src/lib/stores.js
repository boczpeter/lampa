import { writable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import PocketBase from 'pocketbase';

const
  version = 202302,
  session = browser ? localStorage : null,
  apiURL  = browser && !dev ? location.origin+'/api' : 'http://localhost:8090',
  stored  = session?.getItem('version')

export const
  latlng  = writable(''),
  payload = writable(null),
  zoom    = writable(0),
  pid     = writable(session?.getItem('pid')),
  pb      = new PocketBase(apiURL),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  round = n => Number(n).toFixed(5),

  save = obj => session?.setItem(obj.id, obj.value),
  load = obj => obj.value = session?.getItem(obj.id) || obj.value;

pb || console.error(pb)

if (browser && version != stored) { // storage should be reset + store new version id
  console.log(stored, version)
  session?.clear()
  session?.setItem('version', version)
}

pid.subscribe(value => session?.setItem('pid', value))  // store record id in storage
// payload.subscribe(value => browser && value && navigator.clipboard?.writeText(value)) // also copy to clipboard
