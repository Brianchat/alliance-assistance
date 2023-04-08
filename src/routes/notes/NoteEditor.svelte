<script>
  import { db, selectedNote, name, body } from './store';

  const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

  const resetForm = () => {
    name.set('');
    body.set('');
    selectedNote.set({});
  };

  const saveNote = async () => {
    const db$ = await db();
    if (isEmptyObject($selectedNote)) {
      await db$.notes
        .insert({
          name: $name,
          body: $body,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        })
        .then(resetForm);
    } else {
      await $selectedNote
        .update({
          $set: {
            name: $name,
            body: $body,
            updatedAt: new Date().getTime(),
          },
        })
        .then(resetForm);
    }
  };
</script>

<div>
  <input bind:value={$name} placeholder="Note Title" />
  <textarea bind:value={$body} placeholder="Note Content..." />
  <button on:click={saveNote}>Save Note</button>
</div>

<style>

  div {
    margin: 0px;
    padding: 20px;
    box-sizing: border-box;
    background: #fffff3;
    border-radius: 3px;
    border: 1px solid #f7e493;
    width: calc( 100% - 330px);
    min-width: 400px;
    max-width: 1000px;
  }

  input,
  textarea {
    margin: auto;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    resize: vertical;
  }
  textarea {
    min-height: 200px;
  }
</style>
