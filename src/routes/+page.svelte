<script>
    import { onMount } from 'svelte';
    import { status } from '$lib/status';
    import { notes } from '$lib/notes';
    
</script>

<div id="tasks">
    <div>Status: { JSON.stringify($status)}</div>
    {#if $notes?.total_rows>0}
        {#each $notes.rows as row}
            <article style="background-color:{row.doc.color}">{row.doc.start}: {row.doc.title}</article>        
        {/each}
    {/if}
</div>


<style>
    #tasks {
        width: 300px;
        margin: 0px auto;
    }
</style>