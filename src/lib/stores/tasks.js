import { writable } from "svelte/store";
import { create, update } from "../db";

export const tasks = writable([]);

tasks.create = ( task ) =>{
    task.type = "task";
    create(task);
};

tasks.remove = ( task ) =>{
    task.completed = true;
    update(task);
};

tasks.toggle = ( task ) =>{
    task.completed = !task.completed;
    update(task);
};