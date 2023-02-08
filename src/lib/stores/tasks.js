import { writable } from "svelte/store";
import { create, remove } from "../db";

export const tasks = writable([]);

tasks.create = ( task ) =>{
    task.type = "task";
    create(task);
};

tasks.remove = ( task ) =>{
    console.log('Deleting');
    remove(task);
};