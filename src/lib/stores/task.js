import { writable, readable, derived } from "svelte/store";
import { db, sync } from "./db";

export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const task = writable(false);

export const tasks = derived([sync, task], ([$sync, $task ], set)=>{
  if( $task == false ){
    db.find({ 
      selector: {
        start: {"$gt": new Date(Date.now() - 1000*60*60) },
        completedOn: {"$exists": false }
      }
    }).then(function (result) {
      set(result.docs);
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    db.find({ 
      selector: {
        start: {"$lt": new Date(Date.now() + 1000*60*60) },
        peers: {"$elemMatch": $task?._id }
      }
    }).then(function (result) {
      set(result.docs);
    }).catch(function (err) {
      console.log(err);
    });
  }
})

export const upcoming = derived([sync, task], ([$sync, $task], set)=>{
  if( $task == false ){
    db.find({ 
      selector: {
        start: {"$gt": new Date(Date.now() - 1000*60*60) },
        completedOn: {"$exists": false }
      }
    }).then(function (result) {
      set(result.docs);
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    db.find({ 
      selector: {
        start: {$gte: new Date(Date.now()), $lt: new Date(Date.now() + 1000*60*60) }
      }
    }).then(function (result) {
      set(result.docs);
    }).catch(function (err) {
      console.log(err);
    });
  }
})

export const newTask = ()=>{
  db.post({
    title: "test",
    start: new Date(),
    color: "#bc07bc",
  })
}

export const updateTask = ()=>{
  db.put(task)
}

db.changes({
  since: 'now',
  live: true,
}).on('change', (change) => {
  sync.set(change);
}).on('error', function (err) {
  console.log(err);
});


  
