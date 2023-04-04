import { writable } from "svelte/store";
import { create, update, remove } from "../db";

export const projects = writable([]);

projects.create = ( name ) =>{
    create({ name, type: "project"});
};

projects.update = (project) =>{
    update(project);
}

projects.remove = (project) =>{
    remove(project);
}