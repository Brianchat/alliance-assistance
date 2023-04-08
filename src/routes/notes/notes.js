import { writable } from 'svelte/store';
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import noteSchema from './schema';

/**
 * RxDB ========================================================================
 */

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);

export const db = await createRxDatabase({
    name: 'rxdbdemo',
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
    ignoreDuplicate: true
});
await db.addCollections({ notes: { schema: noteSchema } });

/**
 * Svelte Writables ============================================================
 */

export const noteList = db.notes
  .find()
  .sort({ updatedAt: 'desc' })
  .$;
export const selectedNote = writable({});
export const name = writable('');
export const body = writable('');
