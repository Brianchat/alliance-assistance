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

	// Ensure execution only on the browser, after the pouchdb script has loaded.
	onMount(async function () {
		load();
	});
</script>

{#if $page.data.session}
	<header transition:fade>
		<nav data-theme="dark">
			<div name="logo" />
			<ul>
				<li>
					{ JSON.stringify($page.data.session.user.email) }
				</li>
				<li>
					{#if $page.data.session.user?.image}
						<button
							on:click={() => signOut()}
							class="logout button avatar"
							style="--avatar: url('{$page.data.session.user.image}')"
						/>
					{:else}
						<button on:click={() => signOut()}>
							{$page.data.session.user?.name ?? $page.data.session.user?.email}</button
						>
					{/if}
				</li>
			</ul>
		</nav>
	</header>
	<main class="container" transition:fade>
		<slot />
	</main>
{:else}
	<div transition:fade >
		<Login />
	</div>
{/if}

<Logo />


<style>
	nav {
		background-color: #202124;
		border-bottom: solid 1px #404248;
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
