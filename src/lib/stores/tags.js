import { detach_dev } from "svelte/internal";
import { writable, derived, get } from "svelte/store";
import { db, sync } from "./db";

export const tagID = writable('');

export const tag = derived([sync, tagID], ([$sync, $tagID], set)=>{
  if( $tagID.length == 0 || $sync.status == false ){
    set({ err: 'No Result' });
  } else {
    try{
      db.get( $tagID ).then( (result) => {
        console.log(result.docs);
        set(result);
      });
    } catch(err) {
      set([]);
    }
  }
})

export const tags = derived([sync], ([$sync], set)=>{
    if( $sync.status == false ){
      set([]);
    } else {
      try{
        db.find({ 
          selector: {
            type: "tags",
          }
        }).then(function (result) {
          set(result.docs);
        });
      } catch(err) {
        set([]);
      }
    }; 
})

export const create = (name)=>{
  db.post({
    _id: name,
    type: "tags",
    createdOn: new Date()
  })
}

export const save = (tag)=>{
  db.put(tag)
}

export const remove = (tag)=>{
  db.remove(tag);
}


  
