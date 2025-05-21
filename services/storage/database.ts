import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('finanzas.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        avatar TEXT,
        createdAt TEXT NOT NULL,
        preferences TEXT NOT NULL,
        gamification TEXT NOT NULL
      );`,
      [],
      () => console.log('Users table created successfully'),
      (_, error) => {
        console.error('Error creating users table:', error);
        return true; // Rollback transaction
      }
    );
  });
};

export default db;
