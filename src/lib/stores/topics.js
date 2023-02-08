import { writable } from "svelte/store";
import { create, remove } from "../db";

export const topics = writable([]);

topics.create = ( task ) =>{
    task.type = "task";
    create(task);
};

topics.remove = ( task ) =>{
    console.log('Deleting');
    remove(task);
};