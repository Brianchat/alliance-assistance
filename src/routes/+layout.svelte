<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';
	import { status } from '$lib/stores/status';
	import { notes } from '$lib/stores/notes';
	import { tasks } from '$lib/stores/tasks';
	import { db, load } from '$lib/db';

	import Logo from './logo.svelte';
	import Login from './login.svelte';

	import Searchbar from './searchbar.svelte';

	let value = [];
	let selected = [];
	let options = [
		{ value: "AF", name: "Afrikanns"},
			{ value: "SQ", name: "Albanian"},
			{ value: "AR", name: "Arabic"},
			{ value: "HY", name: "Armenian"},
			{ value: "EU", name: "Basque"},
			{ value: "BN", name: "Bengali"},
			{ value: "BG", name: "Bulgarian"},
			{ value: "CA", name: "Catalan"},
			{ value: "KM", name: "Cambodian"},
			{ value: "ZH", name: "Chinese (Mandarin)"},
			{ value: "HR", name: "Croation"},
			{ value: "CS", name: "Czech"},
			{ value: "DA", name: "Danish"},
			{ value: "NL", name: "Dutch"},
			{ value: "EN", name: "English"},
			{ value: "ET", name: "Estonian"},
			{ value: "FJ", name: "Fiji"},
			{ value: "FI", name: "Finnish"},
			{ value: "FR", name: "French"},
			{ value: "KA", name: "Georgian"},
			{ value: "DE", name: "German"},
			{ value: "EL", name: "Greek"},
			{ value: "GU", name: "Gujarati"},
			{ value: "HE", name: "Hebrew"},
			{ value: "HI", name: "Hindi"},
			{ value: "HU", name: "Hungarian"},
			{ value: "IS", name: "Icelandic"},
			{ value: "ID", name: "Indonesian"},
			{ value: "GA", name: "Irish"},
			{ value: "IT", name: "Italian"},
			{ value: "JA", name: "Japanese"},
			{ value: "JW", name: "Javanese"},
			{ value: "KO", name: "Korean"},
			{ value: "LA", name: "Latin"},
			{ value: "LV", name: "Latvian"},
			{ value: "LT", name: "Lithuanian"},
			{ value: "MK", name: "Macedonian"},
			{ value: "MS", name: "Malay"},
			{ value: "ML", name: "Malayalam"},
			{ value: "MT", name: "Maltese"},
			{ value: "MI", name: "Maori"},
			{ value: "MR", name: "Marathi"},
			{ value: "MN", name: "Mongolian"},
			{ value: "NE", name: "Nepali"},
			{ value: "NO", name: "Norwegian"},
			{ value: "FA", name: "Persian"},
			{ value: "PL", name: "Polish"},
			{ value: "PT", name: "Portuguese"},
			{ value: "PA", name: "Punjabi"},
			{ value: "QU", name: "Quechua"},
			{ value: "RO", name: "Romanian"},
			{ value: "RU", name: "Russian"},
			{ value: "SM", name: "Samoan"},
			{ value: "SR", name: "Serbian"},
			{ value: "SK", name: "Slovak"},
			{ value: "SL", name: "Slovenian"},
			{ value: "ES", name: "Spanish"},
			{ value: "SW", name: "Swahili"},
			{ value: "SV", name: "Swedish "},
			{ value: "TA", name: "Tamil"},
			{ value: "TT", name: "Tatar"},
			{ value: "TE", name: "Telugu"},
			{ value: "TH", name: "Thai"},
			{ value: "BO", name: "Tibetan"},
			{ value: "TO", name: "Tonga"},
			{ value: "TR", name: "Turkish"},
			{ value: "UK", name: "Ukranian"},
			{ value: "UR", name: "Urdu"},
			{ value: "UZ", name: "Uzbek"},
			{ value: "VI", name: "Vietnamese"},
			{ value: "CY", name: "Welsh"},
			{ value: "XH", name: "Xhosa"}
	]

	// Ensure execution only on the browser, after the pouchdb script has loaded.
	onMount(async function () {
		load();
	});
</script>

{#if $page.data.session}
<main class="container" transition:fade >
	<slot />
</main>
<header class="nav" transition:fade>
		<Searchbar bind:value bind:options bind:selected id='lang' />
		{#if $page.data.session.user?.image}
			<button
				on:click={() => signOut()}
				class="logout button avatar"
				style="--avatar: url('{$page.data.session.user.image}')"
			/>
		{:else}
			<button 
				on:click={() => signOut()}
				class="logout button avatar" 
			>
				{$page.data.session.user?.name ?? $page.data.session.user?.email}</button
			>
		{/if}
	</header>
{:else}
	<div transition:fade >
		<Login />
	</div>
{/if}

<Logo />


<style>
	header {
		background: linear-gradient( 0deg, var(--muted-border-color) 3%, var(--background-color) );
		border-bottom: solid 1px var(--card-border-color);
	}

    button.logout::before {
		border-radius: 40%;
	}

	button.logout {
		position: absolute;
		top: 1px;
		right: 1px;
		height: 3.2em;
        width: auto;
        min-width: 3.2em;
		text-transform: capitalize;
		padding: 6px 5px 4px 5px;
		border-radius: 1.6em;
	}

	button.logout::after {
		border-radius: 2rem;
        background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: var(--avatar)
	}
</style>
