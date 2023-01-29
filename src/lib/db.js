import { status } from '$lib/status';
import { notes } from '$lib/notes';

export const load = async () => {
    let db = new PouchDB('my_database');
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
        retry: true
    })
        .on('complete', async (complete) => {
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
        })
        .on('error', function (err) {
            status.update((s) => {
                s.status = `Sync Error: ${err}`;
                s.online = false;
                delete s.last_seq;
                return s;
            });
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
    }
  }