<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import Logo from './logo.svelte';
    import { status } from '$lib/stores/status';

    onMount(async function () {
		setTimeout(()=>{ 
            status.update(s=> {
                s.online=true;
                return s;
            })
        }, 800);
	});
</script>

<header>
    <nav>

    </nav>
</header>
{#if $status?.online }
<main transition:fade="{{ duration: 3000 }}" >
    <slot />
</main>
{/if}
<Logo />

<style>

</style>