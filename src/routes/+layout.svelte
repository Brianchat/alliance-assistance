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

<nav>

</nav>
{#if $status?.online }
<main transition:fade="{{ duration: 3000 }}" >
    <slot />
</main>
{/if}
<Logo />

<style>
    nav {
        position:fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 3.8em;
        border-bottom: solid 1px #555;
        background-color: #111;
    }
</style>