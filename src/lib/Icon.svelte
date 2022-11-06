<script>
	import Icon  from '@iconify/svelte';
  export let icon, cat = 'fa-solid', wrap = $$slots.default, size = '1em', cls = '';

  const full = icon?.split(':');
  if (full?.[1]) {
    cat  = full[0];
    icon = full[1];
  }
  let style = `width:${size};height:${size};`;
</script>

{#if cat && icon}
{#if wrap}
  <span class={cls}><svelte:self {cat} {icon} {size} wrap={false} ><slot/></svelte:self></span>
{:else if cat == 'lib' && icon == 'empty'} <!-- our own icon set #fixme -->
  <Icon icon="fa-solid:square-full" {style} class=invisible /><slot/>
{:else}
  <Icon icon="{cat}:{icon}" {style} class={cls} /><slot/>
{/if}
{/if}

<style>
  span {
    display:          var(--display, flex);
    flex-wrap:        var(--flex-wrap, nowrap);
    justify-content:  var(--justify-content, stretch);
    align-items:      var(--align-items, center);
    column-gap:       var(--gap, 1ch);
  }
</style>
