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


{#if $status?.online }
    <header>
        <nav>
            <a href="/deeds">Deeds</a>
            <a href="/tasks">Tasks</a>
        </nav>
    </header>
    <main transition:fade="{{ duration: 3000 }}" >

    <slot />
</main>
{/if}
<Logo />

<style>
    header nav {
        display: flex;
        justify-content: center;
    }

    header nav a {
        margin: 5px;
    }

</style>