import { get, writable } from "svelte/store";
import { db, server, sync, resetDB, startSync } from "./db";

export const user = writable({signedOut: true, ok: false}); // ok used to hide login until checkAuthStatus completes.

export const checkAuthStatus = async () => {
	server.getSession(function (err, response) {
		if (err) {
			resetDB();
			user.set({signedOut: true, ok: true, err});
		} else if (typeof response.userCtx.name != 'string' || response.userCtx.name.length < 2 ) {
			resetDB();
			user.set({signedOut: true, ok: true});
		} else {
			user.set({...response.userCtx, ok: response.ok, signedOut: false});
			startSync();
		}
	});
};

export const logIn = ( username, password) => {
	server.logIn(username, password, (err, response) => {
		if(err){
			user.set({signedOut: true, ok: true, err})
		} else {
			user.set({...response, ok: response.ok, signedOut: false})
			startSync();
		}
	})
}

export const register = ( username, password) => {
		server.signUp(username, password, (err, response) => {
		if(err){
			user.set({signedOut: true, ok: true, err})
		} else {
			logIn( username, password)
		}
	})
}

export const logOut = () => {
	resetDB();
	user.set({signedOut: true, ok: true});
};

// await checkAuthStatus(); // Doing a quick check so that if we have a cookie we 'log in' before starting the sync