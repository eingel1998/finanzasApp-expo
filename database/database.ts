import type { SQLiteDatabase } from 'expo-sqlite'; // Import type for clarity
import * as SQLite from 'expo-sqlite';

let dbInstance: SQLiteDatabase | null = null;
let isInitializing = false;

const getDbInstance = async (): Promise<SQLiteDatabase> => {
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabaseAsync('finanzas.db');
      // Enable foreign key support, which is good practice for relational integrity.
      await dbInstance.execAsync('PRAGMA foreign_keys = ON;');
    } catch (error) {
      console.error('Failed to open database:', error);
      throw new Error('Database could not be initialized');
    }
  }
  if (!dbInstance) { // Should not be reached if openDatabaseAsync succeeded or threw
    throw new Error('Database instance is unexpectedly null after initialization attempt.');
  }
  return dbInstance;
};

export const initDatabase = async () => {
  if (isInitializing) {
    // Si ya se está inicializando, no hacer nada
    return;
  }
  isInitializing = true;
  try {
    const currentDb = await getDbInstance();
    await currentDb.withTransactionAsync(async () => {
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, avatar TEXT, created_at TEXT NOT NULL, currency TEXT DEFAULT "MXN", theme TEXT DEFAULT "system", notifications INTEGER DEFAULT 1, week_start_day INTEGER DEFAULT 0);'
      );
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, description TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL, type TEXT NOT NULL, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories(id), FOREIGN KEY (user_id) REFERENCES users(id));'
      );
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT NOT NULL, icon TEXT, color TEXT, type TEXT NOT NULL, is_default INTEGER DEFAULT 0, parent_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (parent_id) REFERENCES categories(id));'
      );
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT NOT NULL, amount REAL NOT NULL, currency TEXT, period TEXT, start_date TEXT, end_date TEXT, is_recurring INTEGER DEFAULT 0, FOREIGN KEY (user_id) REFERENCES users(id));'
      );
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS budget_categories (budget_id INTEGER, category_id INTEGER, PRIMARY KEY (budget_id, category_id), FOREIGN KEY (budget_id) REFERENCES budgets(id), FOREIGN KEY (category_id) REFERENCES categories(id));'
      );
      await currentDb.execAsync(
        'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT NOT NULL, target_amount REAL NOT NULL, current_amount REAL DEFAULT 0, due_date TEXT, FOREIGN KEY (user_id) REFERENCES users(id));'
      );
    });
    console.log('Database initialized successfully.');
  } catch (error) {
    if (
      String(error).includes('cannot start a transaction within a transaction') ||
      String(error).includes('cannot rollback - no transaction is active')
    ) {
      // Error benigno por doble inicialización rápida, ignorar
      console.warn('Database init: transacción ya activa o rollback innecesario, ignorado.');
    } else {
      console.error('Error initializing database:', error);
      throw error;
    }
  } finally {
    isInitializing = false;
  }
};

export const executeSql = async (sql: string, params: any[] = []): Promise<any> => {
  const currentDb = await getDbInstance();
  const upperSql = sql.trim().toUpperCase();

  try {
    if (upperSql.startsWith('SELECT')) {
      const rows = await currentDb.getAllAsync(sql, ...params);
      return {
        rows: {
          _array: rows,
          length: rows.length,
          item: (index: number) => rows[index],
        },
        rowsAffected: 0, // SELECT statements don't affect rows in this context
        insertId: null,    // No insertId for SELECT statements
      };
    } else if (upperSql.startsWith('INSERT')) {
      const runResult = await currentDb.runAsync(sql, ...params);
      return {
        rows: { _array: [], length: 0, item: () => undefined }, // INSERTs don't return rows in the old API style
        rowsAffected: runResult.changes,
        insertId: runResult.lastInsertRowId,
      };
    } else if (upperSql.startsWith('UPDATE') || upperSql.startsWith('DELETE')) {
      const runResult = await currentDb.runAsync(sql, ...params);
      return {
        rows: { _array: [], length: 0, item: () => undefined },
        rowsAffected: runResult.changes,
        insertId: null, // No insertId for UPDATE/DELETE
      };
    } else {
      // For other statements (e.g., DDL not covered by initDatabase, or other utility statements)
      // Use runAsync as it handles parameters safely. execAsync is for parameter-less bulk SQL.
      const runResult = await currentDb.runAsync(sql, ...params);
      return {
        rows: { _array: [], length: 0, item: () => undefined },
        rowsAffected: runResult.changes,
        // lastInsertRowId is only meaningful for INSERT. For other DML/DDL, it might be 0 or undefined.
        insertId: upperSql.startsWith('INSERT') ? runResult.lastInsertRowId : null,
      };
    }
  } catch (error) {
    console.error(`Error executing SQL: "${sql}" with params: ${JSON.stringify(params)}`, error);
    throw error; // Re-throw to allow calling code to handle it
  }
};