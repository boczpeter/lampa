<script>
	import Popup from '$lib/Popup.svelte';
	import Icon from '$lib/Icon.svelte';
</script>

<Popup type=help>

### A feladat nagyon rövid és egyszerű:

1. A saját településed tetszőleges, de viszonylag forgalmas pontján <time datetime="2023-11-15T19:00:00">november 15-én szerdán, 19:00 és 19:20</time> között kell megszámolni az elhaladó bringásokat és feljegyezni, hányan kerékpároztak kivilágítva.

2. **20 perces** mérésed eredményét [<Icon icon=fa:facebook-square /> hozzászólásként küldd be ide az eseménybe](https://www.facebook.com/events/1727578621077591/?active_tab=discussion)!
Mi táblázatba és infografikába szerkesztjük és közzétesszük az összesítést.

#### Tudnivalók:

- Az úton és járdán haladók ugyanúgy számítanak.
- Pontosan <time datetime="PT0H20M">20 percig</time> mérj!
- Minden haladási irányt számolj!
- Olyan pozíciót keress, hogy haladási iránytól függetlenül jól lásd az első és hátsó lámpát is!
- Csak a világító lámpát számoljuk.
- Forgalmas ponton inkább kérj segítséget!
- Ne torzítsd, becsüld vagy kozmetikázd az adatokat!
- Legyél pontos!
- Ha elrontottad, inkább kezdd újra a 20 percet, de <time datetime="19:30">19:30</time> után már ne fogj bele, mert torzíthatja az eredményt.
- A legkisebb település is számít, de a gyalog tolt bicikli nem.

Kérünk, terjeszd az akciónk hírét, oszd meg a Facebookon, hogy sok helyen mérhessünk és több bringáshoz jusson el.

Ha szeretnél, [iratkozz fel](https://forms.gle/ZUV2H4FiXehfxhMN9), hogy emailben szólhassunk a következő alkalmakról!

#### Csatlakozz hozzánk!

- [Legyél tagunk!](https://kerekparosklub.hu/tag-regisztracio)
- [Csatlakozz a legközelebbi Kerékpárosklub területi szervezethez](https://kerekparosklub.hu/teruleti-szervezetek)!
- [Támogasd a munkánkat adód 1%-ával!](https://kerekparosklub.hu/1)

<img src="/mklogo.png" alt="MK logo">

</Popup>

<style>
  h3 {
    color: #444;
  }
  img { /* MK logo */
    margin: auto;
    display: block;
    min-width: calc(10 * var(--font));
  }
  a, a:visited {
    color: var(--link);
  }
</style>
