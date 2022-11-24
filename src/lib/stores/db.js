import PouchDB from 'pouchdb'; 
import PouchDBFind from 'pouchdb-find';
import PouchDBAuthentication from 'pouchdb-authentication';
import { get, writable } from "svelte/store";
import { EventEmitter } from 'events';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBAuthentication);
EventEmitter.defaultMaxListeners = 15;

export let db = new PouchDB('db');
let syncHandler;

export const sync = writable({ status: false });

export const server = new PouchDB('https://2e6d495a-848e-430a-8731-2e5d6a8d14cc-bluemix.cloudantnosqldb.appdomain.cloud/enque', {skip_setup: true});

export const resetDB = ()=>{
	sync.set({ status: 'resetting' });
    if( typeof syncHandler == 'object' ){
        syncHandler.cancel(); // this will fire the 'complete' listener in the sync below which will clear the local db
		server.logOut();
    };
};

export const startSync = ()=> {
    const state=get(sync);
	if(state.status == false && (typeof syncHandler != 'object' || syncHandler.canceled )){
		sync.set({ status: false });
		syncHandler = db.sync(server, {
			live: true,
			retry: true
		}).on('complete', async function (info) {
            server.logOut();
            db.destroy().then(()=>{
                sync.set({ status: false });
                db = new PouchDB('db');
            });
			sync.set({ status: "signedOut" });
		}).on('change', async function (change) {
			sync.set({ status: "changed", last_seq: change.change.last_seq });
		}).on('error', function (err) {
			sync.set({ status: "error", err });
		});
	} else {
		sync.set({ status: "true" });
	}
};
    