<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	export let value = '';
	export let options = [];
	export let selected = {};
	export let readonly = false;
	export let placeholder = '';

	let inputEl,
		inputValue,
		activeOption,
    activeEl,
		showOptions = false,
		first = true,
		slot;
	const iconClearPath =
		'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';

	onMount(() => {
		slot.querySelectorAll('option').forEach((o) => {
			o.selected && !value.includes(o.value) && (value = [...value, o.value]);
			options = [...options, { value: o.value, name: o.textContent }];
		});
		value &&
			(selected = options.reduce(
				(obj, op) => (value.includes(op.value) ? { ...obj, [op.value]: op } : obj),
				{}
			));
		first = false;
	});

	$: if (!first) value = Object.values(selected).map((o) => o.value);
	$: filtered = options.filter((o) =>
		inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o
	);
	$: if ((activeOption && !filtered.includes(activeOption)) || (!activeOption && inputValue))
		activeOption = filtered[0];

	function add(token) {
		if (!readonly) selected[token.value] = token;
	}

	function remove(value) {
		if (!readonly) {
			const { [value]: val, ...rest } = selected;
			selected = rest;
		}
    inputEl.focus();
	}

	function optionsVisibility(show) {
		if (readonly) return;
		if (typeof show === 'boolean') {
			showOptions = show;
			show && inputEl.focus();
		} else {
			showOptions = !showOptions;
		}
		if (!showOptions) {
			activeOption = undefined;
		}
	}

	function handleKeyup(e) {
		if (e.keyCode === 13) {
			Object.keys(selected).includes(activeOption.value)
				? remove(activeOption.value)
				: add(activeOption);
			inputValue = '';
      inputEl.focus();
		} else if ([38, 40].includes(e.keyCode)) {
			// up and down arrows
			const increment = e.keyCode === 38 ? -1 : 1;
			const calcIndex = filtered.indexOf(activeOption) + increment;
			activeOption =
				calcIndex < 0
					? filtered[filtered.length - 1]
					: calcIndex === filtered.length
					? filtered[0]
					: filtered[calcIndex];
      document.getElementsByClassName("option active")[0]?.scrollIntoView({
        behavior: 'smooth'
      });
		} else {
      optionsVisibility(true);
    }
	}

	function handleBlur(e) {
		optionsVisibility(false);
	}

	function handleTokenClick(e) {
		if (e.target.closest('.dropdown-arrow')) {
			e.stopPropagation();
			optionsVisibility();
		} else if (e.target.closest('.token-remove')) {
			e.stopPropagation();
			remove(e.target.closest('.token').dataset.id);
      inputEl.focus();
      optionsVisibility(true);
		} else if (e.target.closest('.remove-all')) {
			selected = [];
			inputValue = '';
      inputEl.focus();
      optionsVisibility(true);
		} 
	}

	function handleOptionMousedown(e) {
		const value = e.target.dataset.value;
    inputEl.focus();
		if (selected[value]) {
			remove(value);
		} else {
			add(options.filter((o) => o.value === value)[0]);
		}
	}
</script>

<div class="searchbar" class:readonly>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="tokens" class:showOptions on:click={handleTokenClick}>
		{#each Object.values(selected) as s}
			<div class="token" data-id={s.value}>
				<span>{s.name}</span>
				{#if !readonly}
					<div class="token-remove" title="Remove {s.name}">
						<svg
							class="icon-clear"
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
						>
							<path d={iconClearPath} />
						</svg>
					</div>
				{/if}
			</div>
		{/each}
		<div class="actions">
			{#if !readonly}
				<input
					id="search"
          type="search"
          name="search"
					autocomplete="off"
					bind:value={inputValue}
					bind:this={inputEl}
					on:keyup={handleKeyup}
					on:blur={handleBlur}
					{placeholder}
				/>
				<div class="remove-all" title="Remove All" class:hidden={!Object.keys(selected).length}>
					<svg
						class="icon-clear"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
					>
						<path d={iconClearPath} />
					</svg>
				</div>
				<svg
					class="dropdown-arrow"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z" /></svg
				>
			{/if}
		</div>
	</div>

	<select bind:this={slot} type="multiple" class="hidden"><slot /></select>

	{#if showOptions}
		<ul
			class="options"
			transition:fly={{ duration: 200, y: 5 }}
			on:mousedown|preventDefault={handleOptionMousedown}
		>
			{#each filtered as option}
				<li
        class="option"
        class:selected={selected[option.value]}
					class:active={activeOption === option}
					data-value={option.value}
				>
					{option.name}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.searchbar {
		position: fixed;
		left: 100px;
		right: 70px;
		width: auto;
    min-height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
	}

	.tokens,
	.actions {
		position: relative;
	}

	.searchbar:not(.readonly):hover {
		border-bottom-color: hsl(0, 0%, 50%);
	}

	.tokens {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}

	.tokens::after {
		background: none repeat scroll 0 0 transparent;
		bottom: -1px;
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		position: absolute;
		background: var(--tertiary);
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: 0;
	}

	.tokens.showOptions::after {
		width: 100%;
		left: 0;
	}

	.token {
		align-items: center;
    background-color: var(--form-element-background-color);
    border: solid 1px var(--color);
		border-radius: 1.25rem;
		display: flex;
		margin: 0.2rem 0.3rem 0.2rem 0;
		max-height: 2rem;
		padding: 0.4rem;
		transition: background-color 0.3s;
		white-space: nowrap;
	}

  .token:first-child, .token:nth-child(2), .token:nth-child(3)  {
    border: none;
		border-radius: 0px;
    margin: 0.2rem 0;
	}

  .token:first-child {
    padding-left: 0.2rem;
    clip-path: polygon(0% 0%, calc(100% - 0.3rem) 0%, 100% 50%, calc(100% - 0.3rem) 100%, 0% 100%);
	}

  .token:nth-child(2), .token:nth-child(3) {
    clip-path: polygon(0% 0%, calc(100% - 0.3rem) 0%, 100% 50%, calc(100% - 0.3rem) 100%, 0% 100%, calc(0% + 0.3rem) 50%);
	}

	.token:hover {
		background-color: var(--form-element-active-background-color);
    border-color: var(--form-element-active-border-color);
	}

	.token-remove,
	.remove-all {
		align-items: center;
		background-color: var(--form-element-border-color);
		border-radius: 50%;
		color: var(--form-element-active-background-color);
    display: flex;
		justify-content: center;
		height: 1.25rem;
		margin-left: 0.25rem;
		min-width: 1.25rem;
	}

	.token-remove:hover,
	.remove-all:hover {
		background-color: var(--form-element-active-border-color);
    cursor: pointer;
	}

  .token-remove {
    display: none;
  }

  .token:hover .token-remove, .remove-all {
    display: flex;
  }

	.readonly .token {
		color: hsl(0, 0%, 40%);
	}

	.actions {
		align-items: center;
		display: flex;
		flex: 1;
		min-width: 15rem;
	}

	input#search {
		margin: 2px 0px;
    padding: 0.2rem 1rem 0.2rem 2rem;
		width: 100%;
    max-height: 2rem;
    background-color: #222;
    background-position: center left .7rem;
    color: var(--color);
	}

	.dropdown-arrow path {
		fill:  var(--primary-inverse);
	}

	.multiselect:hover .dropdown-arrow path {
		fill:  var(--primary-inverse);
	}

	.icon-clear path {
		fill:  #fff;
	}

	.options {
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px -2px 4px rgba(0, 0, 0, 0.1);
		left: 0;
		list-style: none;
		margin-block-end: 0;
		margin-block-start: 0;
		max-height: 70vh;
		overflow: auto;
		padding-inline-start: 0;
		position: absolute;
		top: calc(100% + 1px);
		width: 100%;
    background-color: var(--form-element-active-background-color);
	}

	li {
		background-color: var(--form-element-background-color);
		cursor: pointer;
		padding: 0.5rem;
	}

	li:last-child {
		border-bottom-left-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
	}

	li:not(.selected):hover {
		background-color: var(--form-element-background-color);
	}

	li.selected {
		background-color: var(--primary);
		color: white;
	}

	/* li.selected:nth-child(even) {
		background-color: hsl(232, 50%, 45%);
		color: white;
	} */

	li.active, li.selected.active:hover {
		background-color: var(--tertiary);
    color: #222;
	}

	li.selected.active,
	li.selected:hover {
		background-color: var(--primary-hover);
	}

	.hidden {
		display: none;
	}
</style>
