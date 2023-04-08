<script>
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    function remove() {
      dispatch("remove", { todo });
    }
  
    function toggleStatus() {
      dispatch("update", {
        todo: {
          ...todo,
          complete: !todo.complete,
        },
      });
    }
  
    export let todo;
</script>

<li>
    {#if todo.complete}
    <span class="is-complete">{todo.text}</span>
    <button on:click="{toggleStatus}">❌</button>
    {:else}
    <span>{todo.text}</span>
    <button on:click="{toggleStatus}">✔️</button>
    {/if}
    <button on:click="{remove}">💥</button>
</li>