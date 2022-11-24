import { detach_dev } from "svelte/internal";
import { writable, derived, get } from "svelte/store";
import { db, sync } from "./db";

export const noteID = writable('');

export const note = derived([sync, noteID], ([$sync, $noteID], set)=>{
  if( $noteID.length == 0 || $sync.status == false ){
    set([{ err: 'No Result' }]);
  } else {
    try{

      db.get( $noteID ).then( (result) => {
        console.log(result.docs);
        set(result);
      });
    } catch(err) {
      set({});
    }
  }
})

export const notes = derived([sync], ([$sync], set)=>{
    if( $sync.status == false ){
      set([]);
    } else {
      try{
        db.find({ 
          selector: {
            type: "notes",
          }
        }).then(function (result) {
          set(result.docs);
        });
      } catch(err) {
        set([]);
      }
    }; 
})

export const create = (blot)=>{
  db.post({
    type: "notes",
    createdOn: new Date(),
    blot
  })
}

export const save = (note)=>{
  db.put(note)
}

export const remove = (note)=>{
  db.remove(note);
}


  
