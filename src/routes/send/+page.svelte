<script>
	import Popup from '$lib/Popup.svelte';
	import Icon from '$lib/Icon.svelte';
	import { payload, pb, pid } from '$lib/stores';
	// import { goto } from '$app/navigation';

	const size = 'var(--midfont)', style = `position:absolute;top:0;left:0;width:${size};height:${size}`,
		title = {
			pending		: 'Küldés&hellip;',
			fulfilled	: 'Sikeres beküldés!',
			rejected	: 'Kapcsolódási hiba!',
		}

	let promise, msg, state = 'pending'

	function submit() {
		if (!$payload)	return;	// fixme goto main page
		// console.log($payload, $pid)
		const coll = pb.collection('posts'),
			rec = {json:$payload},
			promise = $pid ? coll.update($pid, rec) : coll.create(rec)

		promise.then(record => {
			state = 'fulfilled'
			console.info(record)
			$pid = record.id
		}).catch(err => {
			state = 'rejected'
			console.error(err)
			msg = err?.response?.message
		})
	}
</script>

<Popup type=send>
	<h3 use:submit class={state}>{title[state]}</h3>

	{#if state == 'pending'}
		<Icon icon="eos-icons:loading" size=12em/>

	{:else if state == 'fulfilled'}
		<Icon icon="fa6-regular:thumbs-up" {style}/>
		<p>Adataidat rögzítettük a szerveren, de megmaradnak az eszközödön továbbra is.
			Így akár tovább számolhatsz és megismételheted a beküldést, de az a korábbi adataidat módosítja!

			Ha másik helyszín adatait szeretnéd beküldeni, akkor használj másik eszközt, vagy töröld a böngészőben az oldalhoz rendelt helyi adatokat, hogy tiszta lappal indulj.

			Köszönjük a részvételedet!</p>

	{:else if state == 'rejected'}
		<Icon icon="bx:error-alt" {style}/>
		{#if msg}
			<p class=rejected><i>{msg}</i></p>
		{/if}
		<p>Nem sikerült rögzíteni az adataidat! Lehet, hogy a szerver pillanatnyilag nem elérhető.

			Az eszközöd továbbra is tárolja őket (amíg kézzel nem törlöd), ezért később bármikor beküldheted.

			Kérlek, próbáld újra később!</p>
	{/if}
</Popup>

<style>
	h3 {
		margin-top: 0;
		margin-left: var(--midfont);
		padding-inline: 1ch;
	}
	p {
		white-space: pre-line;
		line-height: 1.5;
	}
	.pending {
		color: var(--off);
	}
	.rejected {
		color: #f55;
	}
</style>
