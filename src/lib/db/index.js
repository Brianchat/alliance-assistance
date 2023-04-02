import { get } from 'svelte/store'
import { page } from '$app/stores';

import { status } from '$lib/stores/status';
import { notes } from '$lib/stores/notes';
import { tasks } from '$lib/stores/tasks';
import { projects } from '$lib/stores/projects';

export let db;

export const load = async () => {
	db = new PouchDB('my_database');
	// const server = new PouchDB(`${location.origin}/db`);
	const server = new PouchDB(
		'https://2e6d495a-848e-430a-8731-2e5d6a8d14cc-bluemix.cloudantnosqldb.appdomain.cloud/enque',
		{
			auth: {
				username: 'brian',
				password: 'password'
			}
		}
	);

	db.sync(server, {
		live: true,
		retry: true,
		// filter: 'index/owner',
  		// query_params: {owner: encodeURIComponent(owner)}
	})
		.on('complete', async () => {
			db.destroy().then(() => {
				db = new PouchDB('db');
			});
			status.update((s) => {
				s.status = 'Offline';
				s.online = false;
				delete s.last_seq;
				return s;
			});
		})
		.on('change', async function (c) {
			status.update((s) => {
				s.status = 'Synching: Change received.';
				s.online = true;
				s.last_seq = c?.change?.last_seq;
				return s;
			});
			notes.set(
				await db.allDocs({
					include_docs: true,
					attachments: true
				})
			);
            db.query('index', {
                key: 'task',
                include_docs: true
            }).then((result) =>{
                tasks.set( result.rows )
            });

			db.query('index', {
				key: 'project',
				include_docs: true
			}).then((result) =>{
				projects.set( result.rows )
			});
		})
		.on('active', async function (active) {
			status.update((s) => {
				s.status = 'Synching Active.';
				s.online = true;
				s.last_seq = active?.change?.last_seq;
				return s;
			});
			notes.set(
				await db.allDocs({
					include_docs: true,
					attachments: true
				})
			);
            db.query('index', {
                key: 'task',
                include_docs: true
            }).then((result) =>{
                tasks.set( result.rows )
            });
		})
		.on('error', function (err) {
			status.update((s) => {
				s.status = `Sync Error: ${err}`;
				s.online = false;
				delete s.last_seq;
				return s;
			});
		});

    db.query('index', {
        key: 'task',
        include_docs: true
    }).then((result) =>{
        tasks.set( result.rows )
    });

	db.query('index', {
        key: 'project',
        include_docs: true
    }).then((result) =>{
        projects.set( result.rows )
    });

    notes.set(
        await db.allDocs({
            include_docs: true,
            attachments: true
        })
    );

	status.update((s) => {
		s.status = 'Synching Active.';
		s.online = true;
		return s;
	});
	return {
		//   session: await event.locals.getSession(),
	};
};

export const create = async (doc) => {
	const owner = get(page)?.data.session.user.email;
	doc.owner = encodeURIComponent(owner);
    doc.start = new Date();
    try {
		return db.post(doc);
	} catch (err) {
		console.log(err);
	}
};

export const remove = async (doc) => {
    try {
		return db.remove(doc);
	} catch (err) {
		console.log(err);
	}
};

export const update = async (doc) => {
    try {
		return db.put(doc);
	} catch (err) {
		console.log(err);
	}
};
