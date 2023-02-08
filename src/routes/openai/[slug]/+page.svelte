<script>
	import {goto} from '$app/navigation';
    /** @type {import('./$types').PageData} */
	export let data;
    let animal = data.animal;
    let disabled = false;

    const submit = ()=>{
        disabled = true;
        goto('/openai/'+animal);
    }


</script>

<h3>Name my pet</h3>

<input
    type="text"
    name="animal"
    placeholder="Enter an animal"
    bind:value={animal}
    on:change={submit}
/>
<button on:click={submit} {disabled} >Generate names</button>

{#if disabled}
<ul >
	{#each data.result.split(',') as name}
		<li>{name}</li>
	{/each}
</ul>
{/if}