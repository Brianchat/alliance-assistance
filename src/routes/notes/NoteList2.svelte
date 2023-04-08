<script>
  import { onMount } from 'svelte';

  import { noteList } from './notes';
  import { db, selectedNote, name, body } from './store';
  

  const handleEditNote = (note) => {
    selectedNote.set(note);
    name.set(note.name);
    body.set(note.body);
  };

  const deleteNote = async (note) => await note.remove();
</script>

<div>

  <ul id="note-list" class="nostyle">
    {#if typeof $noteList == 'object'}
      {#each $noteList as note}
        <li on:click={() => handleEditNote(note)}>
          <p class="name">{note.name}</p>
          <p class="meta">
            {new Date(note.updatedAt).toLocaleDateString('en-US')}
          </p>
          <button on:click|stopPropagation={() => deleteNote(note)} class="btn btn-delete">delete</button>
        </li>
      {/each}
    {/if}
  </ul>
</div>

<style>
  div {
    width: 300px;
    padding: 0px;
    margin: 0px;
  }

  ul {
    padding: 0px;
    margin: 0px;
  }

  li {
    position: relative;
    border: solid 1px #ccc;
    padding: 3px 5px;
  }
  
  p {
    color: #333;
    margin: 3px 10px;
    font-size: large;
  }

  .btn-delete {
    cursor: pointer;
    width: auto;
    position: absolute;
    margin: 0px;
    right: 5px;
    bottom: 5px;
  }
  .meta {
    color: #747474;
    font-size: small;
  }
</style>
