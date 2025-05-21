import db from '@/services/storage/database';
import 'react-native-get-random-values'; // For uuid
import { v4 as uuidv4 } from 'uuid'; // For generating user IDs

// Define the User type (consider moving to a shared types file if not already)
// Based on docs/MODELOS_DATOS.MD and AuthContext.tsx
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string; // ISO Date string
  preferences: string; // JSON string for preferences
  gamification: string; // JSON string for gamification stats
}

// Type for creating a new user, ID and createdAt are generated automatically
// Preferences and Gamification are also defaulted if not provided partially
export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'preferences' | 'gamification'> & 
  Partial<Pick<User, 'avatar' | 'preferences' | 'gamification'>>;


/**
 * Finds a user by their email address.
 * @param email The email of the user to find.
 * @returns A Promise that resolves to the User object or null if not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  console.log(`userService: Attempting to get user by email: ${email}`);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?;',
        [email],
        (_, { rows }) => {
          if (rows.length > 0) {
            const userData = rows.item(0) as User;
            console.log('userService: User found by email:', userData.id);
            resolve(userData);
          } else {
            console.log('userService: User not found by email:', email);
            resolve(null);
          }
        },
        (_, error) => {
          console.error('userService: SQL error getting user by email:', error);
          reject(new Error(`Failed to get user by email: ${error.message}`));
          return true; // Rollback
        }
      );
    });
  });
};

/**
 * Creates a new user in the database.
 * ID, createdAt, default preferences, and default gamification are handled.
 * @param userData The data for the new user.
 * @returns A Promise that resolves to the newly created User object.
 */
export const createUser = async (userData: CreateUserDTO): Promise<User> => {
  const userId = uuidv4();
  const createdAt = new Date().toISOString();

  const defaultPreferences = JSON.stringify({
    currency: "MXN",
    theme: "system",
    notifications: true,
    weekStartDay: 1, // Monday
  });

  const defaultGamification = JSON.stringify({
    level: 1,
    experience: 0,
    achievements: [],
    streakDays: 0,
    lastActiveDate: createdAt,
  });

  const newUser: User = {
    id: userId,
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar,
    createdAt,
    preferences: userData.preferences || defaultPreferences,
    gamification: userData.gamification || defaultGamification,
  };
  
  console.log('userService: Attempting to create user:', newUser.email);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (id, name, email, avatar, createdAt, preferences, gamification) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          newUser.id,
          newUser.name,
          newUser.email,
          newUser.avatar || null, // Ensure avatar is null if undefined
          newUser.createdAt,
          newUser.preferences,
          newUser.gamification,
        ],
        (_, { insertId, rowsAffected }) => {
          // For expo-sqlite, insertId might not be reliable for UUIDs or might be 0.
          // rowsAffected should be 1 if successful.
          if (rowsAffected > 0) {
            console.log('userService: User created successfully:', newUser.id);
            resolve(newUser);
          } else {
            console.error('userService: User creation failed, no rows affected.');
            reject(new Error('User creation failed, no rows affected.'));
          }
        },
        (_, error) => {
          console.error('userService: SQL error creating user:', error);
          reject(new Error(`Failed to create user: ${error.message}`));
          return true; // Rollback
        }
      );
    });
  });
};
