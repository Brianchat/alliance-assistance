<script>
    import { onMount } from 'svelte';
    import { sortBy } from "lodash";

    import TodoItem from "./TodoItem.svelte";

    let db = new PouchDB("db");

    let todos = [];
    let newTodoText = "";
    let sortByWhat = "createdAt";
    let filterByWhat = "";

    async function add(event) {
        const newTodo = {
            text: newTodoText,
            complete: false,
            createdAt: new Date().toISOString(),
        };
        const addition = await db.post(newTodo);
        if (addition.ok) {
            // Fetch all todos from the local DB again
            await updateTodos()
        }
        newTodoText = "";
    }

    async function updateTodos() {
        const allDocs = await db.allDocs({
            include_docs: true,
        });
        todos = allDocs.rows.map((row) => row.doc);
    }

    async function updateStatus(event) {
        const { todo } = event.detail;
        const update = await db.put(todo);
        if (update.ok) {
            await updateTodos();
        }
    }

    async function removeItem(event) {
        const { todo: todoToRemove } = event.detail;
        const removal = await db.remove(todoToRemove);
        if (removal.ok) {
            todos = todos.filter((todo) => {
            return todo._id !== todoToRemove._id;
            });
        }
    }

    onMount(async () => {
        await updateTodos();
    });

    $: sortedAndFilteredTodos = sortBy(todos, [sortByWhat]).filter((todo) => {
        const [filterKey, filterValue] = filterByWhat.split(":");
        // Only filter if there’s a proper filter set
        return filterKey && filterValue
            ? todo[filterKey].toString() === filterValue
            : true;
    });
</script>

<h1>Tasks</h1>
<div>
    <label for="filter">Filter:</label>
    <select id="filter" bind:value="{filterByWhat}">
      <option value="">Show all todos</option>
      <option value="complete:true">Show completed todos</option>
      <option value="complete:false">Show open todos</option>
    </select>
  </div>
<ul>
    {#each sortedAndFilteredTodos as todo}
    <TodoItem todo="{todo}" on:remove="{removeItem}" on:update="{updateStatus}" />
    {/each}
</ul>

<form on:submit|preventDefault="{add}">
    <input type="text" bind:value="{newTodoText}" />
    <button type="submit">➕ Add new task</button>
</form>