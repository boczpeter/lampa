<script>
  import { browser } from '$app/env';
	import { externalLink } from '$lib/stores.js';
  import SvelteMarkdown from 'svelte-markdown';

  const map = new Map([
    ['hu', `### A feladat nagyon rövid és egyszerű:

1. A saját településed tetszőleges, de viszonylag forgalmas pontján <time datetime="2021-11-11">november 11-én csütörtökön</time>, <time datetime="19:00">19:00</time> és <time datetime="19:20">19:20</time> között kell megszámolni az elhaladó bringásokat és feljegyezni, hányan kerékpároztak kivilágítva.
2. <time datetime="PT0H20M">20</time> perces mérésed eredményét [hozzászólásként küldd be ide az eseménybe](https://www.facebook.com/events/622147172546653?ref=newsfeed)! Mi táblázatba és infografikába szerkesztjük és közzétesszük az összesítést.

#### Tudnivalók:

- Az úton és járdán haladók ugyanúgy számítanak.
- Pontosan <time datetime="PT20M">20 percig</time> mérj!
- Minden haladási irányt számolj!
- Olyan pozíciót keress, hogy haladási iránytól függetlenül jól lásd az első és hátsó lámpát is!
- Csak a világító lámpát számoljuk.
- Forgalmas ponton inkább kérj segítséget!
- Ne torzítsd, becsüld vagy kozmetikázd az adatokat!
- Legyél pontos!
- Ha elrontottad, inkább kezdd újra a <time datetime="PT20M">20 percet</time>, de <time datetime="19:30">19:30</time> után már ne fogj bele, mert torzíthatja az eredményt.
- A legkisebb település is számít, de a gyalog tolt bicikli nem.
Kérünk terjeszd az akciónk hírét, oszd meg a Facebookon, hogy sok helyen mérhessünk, és több bringáshoz jusson el.

Ha szeretnél, [iratkozz fel](https://forms.gle/ZUV2H4FiXehfxhMN9), hogy emailben szólhassunk a következő alkalmakról!

#### Csatlakozz hozzánk!

- [Lépj be a klubba](https://kerekparosklub.hu/tagsagiakcio2021tel) - tagságoddal a bringás fejlődésért végzett munkát támogatod, biztosítást, kedvezményeket, jogsegélyt kaphatsz - és 264 nyeremény is vár!
- [Csatlakozz a legközelebbi Kerékpárosklub területi szervezethez](https://kerekparosklub.hu/teruleti-szervezetek)!
- [Támogasd a munkánkat](https://kerekparosklub.hu/tamogass-minket)!
`],

    ['en', `Same in English...`],

  ]);  // end markdown set

  let lang = browser ? document.documentElement.lang : map.keys().next().value, // Get lang from document or select 1st key
    source = map.get(lang),
    out;   // bound to output html node

  $: externalLink(out, 'a');  // postprocess all links
</script>

<output bind:this={out}>
  <SvelteMarkdown {source}/>
  <!-- Elements within SvelteMarkdown output cannot be styled, so we include the following verbatim -->
  <img src="mklogo.png" alt="MK logo">
</output>

<style>
  img { /* MK logo */
    margin: auto;
    display: block;
    min-width: calc(10 * var(--font));
  }
  /* time {
    text-decoration: dotted underline #888;
  } */
	output {
		color: #000;
		font-size: var(--font);
		max-height: calc(100vh - 8 * var(--gap) - var(--bigfont));
		overflow-y: auto;
    overscroll-behavior: none;
	}
</style>
