import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('finanzas.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, type TEXT NOT NULL, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id));'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, type TEXT NOT NULL);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER UNIQUE NOT NULL, amount REAL NOT NULL, month TEXT NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(id));'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, target_amount REAL NOT NULL, current_amount REAL DEFAULT 0, due_date TEXT);'
    );

    // Insert default user if not exists
    tx.executeSql(
      'SELECT * FROM users WHERE email = ?', ['usuario@ejemplo.com'],
      (_, { rows }) => {
        if (rows.length === 0) {
          tx.executeSql(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            ['Usuario', 'usuario@ejemplo.com']
          );
        }
      }
    );


    console.log('Database initialized successfully.');
  }, (error) => {
    console.error('Error initializing database:', error);
  }, () => {
    console.log('Database initialization transaction complete.');
  });
};

export const executeSql = (sql: string, params: any[] = []) => {
  return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sql, params, (_, resultSet) => {
        resolve(resultSet);
      }, (_, error) => {
        reject(error);
        return false; // Rollback transaction on error
      });
    });
  });
};