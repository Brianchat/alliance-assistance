<script>
    import { onMount } from 'svelte';
    import { status } from '$lib/stores/status';
    import { tasks } from '$lib/stores/tasks';
    import { notes } from '$lib/stores/notes';  
    import { projects } from '$lib/stores/projects'; 
    
    import Tasks from './tasks.svelte';

    let name
</script>

<h1>{ $tasks.length } Tasks</h1>

<div id="tasks">
    {#each $projects as row}
        <article>
            <p>{row.doc.name}</p>
            <button on:click={()=>projects.remove(row.doc)}>X</button>
        </article>        
    {/each}
    <!-- <Tasks /> -->
    <input bind:value={name} />
    <button on:click={()=>projects.create(name)}>New</button>
</div>

<style>
    #tasks {
        width: 300px;
        margin: 0px auto;
    }
</style>