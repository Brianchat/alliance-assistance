<script>
	import { onMount } from 'svelte';
	import { cubicInOut, cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
	import MultiSelect from 'svelte-multiselect';
	import { Chasing } from 'svelte-loading-spinners';

	import { sync } from '$lib/stores/db';
	import { user, logOut, checkAuthStatus } from '$lib/stores/user';
	import { notes } from '$lib/stores/notes';
	import Login from './login.svelte';
	import Logo from './logo.svelte';

	export const ssr = false;

	let h;
	let w;
	let navHeight = 50;
	let sidebarOpen = true;
    let options = ['animal','bee','camel','dolphin','elephant','fish','giraffe','hippo','iguana','jackal','koala','lima','mongoose']; 
    let selected = [];
    let tags = [];

	const clientSettings = writable({h, w, navHeight});
	setContext('clientSettings', clientSettings);

    const update = (e) => {
        let url = new URL($page.url);
        let newSelected = [...selected];
        if (e.detail.type === 'add') newSelected.concat(e.detail.option);
        if (e.detail.type === 'remove') newSelected.filter(item => item !== e.detail.option);
        if (e.detail.type === 'removeAll') newSelected = [];
        newSelected.length>0 ? url.searchParams.set('tags', newSelected) : url.searchParams.delete('tags');
        goto(url);
    };

	onMount(() => {
		checkAuthStatus();
	});

	$: sidebarWidth = 0; // w > 100 ? '240px' : '50px';
    $: selected = $page.url.searchParams.get('tags') ? $page.url.searchParams.get('tags').split(',') : [];
	$: { clientSettings.set({ h, w, navHeight})}
</script>

<svelte:window bind:innerHeight={h} bind:innerWidth={w} />


{#if $user.name}
    <main
		in:fade={{ duration: 1000, delay: 2500, easing: cubicIn }}
		out:fade={{ duration: 1000, easing: cubicOut }}
		style="--sidebar-width: {sidebarWidth};--nav-height: {navHeight}"
	>
		<slot />
	</main>
	<nav in:fade={{ duration: 1000, delay: 2000, easing: cubicIn }} out:fade={{ y: h, duration: 1200, easing: cubicOut }} bind:clientHeight={navHeight} >
		<MultiSelect
			bind:selected
			options={options}
			outerDivClass="search form_group"
            liSelectedClass="tag_selected"
            liOptionClass="tag_option"
			inputClass="form_field"
			placeholder="Type to Search..."
            allowUserOptions="append*"
            on:change={update}
		>
			<span let:idx let:option slot="option" class="option">
				<i class="fa-solid fa-tag" />
				{option}
			</span>
			<span let:idx let:option slot="selected" class="selected">
				<i class="fa-solid fa-tag" />
				{option}
			</span>
		</MultiSelect>
		<button class="logout button" type="submit" on:click={logOut}>{$user.name.split(" ").map((n)=>n[0]).join("")}</button>
	</nav>
{:else if $user.signedOut && $user.ok}
	<Login />
{:else}
	<div id="spinner" out:fade={{ duration: 500, delay: 500 }} >
		<Chasing size="60" color="#bc07bc" unit="px" duration="1s" />
	</div>
{/if}
<Logo />

<style>
	:global(body) {
		height: 100vh;
		margin: 0px;
		padding: 0px;
		font-family: 'Maven Pro', sans-serif;
		overflow: hidden;
		background-color: #e7ece7;
	}

	#spinner {
		position: fixed;
 		top: calc(50vh - 220px);
		left: calc(50vw + 8px);
		transition-duration: 2.5s;
		transition-delay: 1s;
	}

	nav {
		position: fixed;
		height: var(--nav-height, 50px);
		left: 0px;
		right: 0px;
		margin: 0px;
		background-color: #2d2d2d;
		padding: 0px;
		border-bottom: solid 1px #333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		position: fixed;
		top: 51px;
		left: var(--sidebar-width);
		right: 0px;
		bottom: 0px;
		background-color: #e7ece7;
		overflow: auto;
		z-index: 1;
	}

	button.logout {
		position: absolute;
		top: 1px;
		right: 1px;
		width: 42px;
		height: 40px;
		text-transform: capitalize;
		padding: 6px 5px 4px 5px;
		border-radius: 21px;
	}

	button.logout:after {
		border-radius: 21px;
	}

</style>
