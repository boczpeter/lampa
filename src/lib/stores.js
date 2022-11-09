import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const session = browser && sessionStorage;
export const
  rows = [
    {name:'Első+hátsó' },
    {name:'Csak első ', cls:'front'},
    {name:'Csak hátsó', cls:'back' },
    {name:'Egyik sem ', cls:'none' },
  ],
  total = {name: 'Kerékpárosok száma', value: 0},
  meta = [
    {value:'', name: 'Neved/Nicked',	icon:'user-circle'},
    {value:'', name: 'Város',					icon:'city'},
    {value:'', name: 'Lakosságszám',	icon:'users'},
    {value:'', name: 'Helyszín',			icon:'map'},
    {value:'', name: 'GPS',						icon:'map-marker-alt'},
  ],
  fields = [...meta, total, ...rows],
  latlng    = writable(''),
  clipboard = writable(''),

  // Make node's selected links external to prevent Router from handling them
  externalLink = (node, sel) => node?.querySelectorAll(sel).forEach(
    a => Object.assign(a, {rel:'external noopener', target:'_blank'})),

  save = obj => session && session.setItem(obj.id, obj.value),
  load = obj => obj.value = session && session.getItem(obj.id) || obj.value
;

clipboard.subscribe(value => browser && value && navigator.clipboard?.writeText(value));

rows.forEach(row => Object.defineProperties(row, {
  data: {value: 0, writable: true},
  value: {
    get: () => row.data,
    set: v => {
      if (0 <= row.data) {
        total.value += v - row.data
        row.data = v
        save(row)
      } else {	// catch for errors
        row.data = 0
      }
    }
  }
}));

fields.forEach((f, i) => load(Object.assign(f, {id: i})));	// add ID and load saved data
