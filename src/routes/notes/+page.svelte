<script>
    import NoteEditor from './NoteEditor.svelte';
    import NoteList from './NoteList.svelte';
</script>
  
<div class="grid">
    <NoteList />
    <NoteEditor />
</div>
  
<style>
    div.grid {
      background-color: rgb(248, 247, 241);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px;
      width: auto;
      margin: 0px auto;
    }
</style>
  