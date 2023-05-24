// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB('contact', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contact')) {
        console.log('database already exists');
        return;
      }
      db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
      console.log('database contact created');
    },
  });


// TODO: Complete the postDb() function below:
export const postDb = async (content) => {
  console.log('Post to the ase');
  const todosDb = await openDB('contact', 1);
  const tx = todosDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.add({ todo: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  console.log('Get from the database');
  const todosDb = await openDB('contact', 1);
  const tx = todosDb.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.getAll();
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const todosDb = await openDB('contact', 1);
  const tx = todosDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
