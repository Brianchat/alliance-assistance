<script>
    import { onMount } from 'svelte';
    import { status } from '$lib/stores/status';
    import { tasks } from '$lib/stores/tasks';
    import { notes } from '$lib/stores/notes';
    
</script>
<h1>{ $tasks.length } Tasks</h1>
<p>{ $status.last_seq }</p>

<div id="tasks">
    {#each $tasks as row}
        <article style="background-color:{row.doc.color}">
            <p>{row.doc.start}</p>
            <p>{row.doc.title}</p>
            <p>{row.doc.owner}</p>
            <button on:click={()=>tasks.remove(row.doc)}>X</button>
        </article>        
    {/each}
    <button on:click={()=>tasks.create({title: "Autoupdate working?" })} >New</button>
</div>

<style>
    #tasks {
        width: 300px;
        margin: 0px auto;
    }
</style>