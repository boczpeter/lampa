<script>
	import Icon  from '@iconify/svelte';
  export let icon, cat = 'fa-solid', wrap = $$slots.default, size = '1em', cls = '';

  const full = icon?.split(':');
  if (full?.[1]) {
    cat  = full[0];
    icon = full[1];
  }
  let style = `width:${size};height:${size};`;
  // console.log($$slots)
</script>

{#if cat && icon}
{#if wrap}
  <span class={cls}><svelte:self {cat} {icon} {size} wrap={false} ><slot/></svelte:self></span>
{:else if cat == 'lib'} <!-- our own icon set #fixme -->
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="0.88em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512" {style} class="iconify {cls}"></svg>
  <slot/>
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
