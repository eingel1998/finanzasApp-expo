import { executeSql } from '@/database/database';
import { Alert } from 'react-native';

// Interfaz para el usuario
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  weekStartDay: number;
}

// Interfaz para el registro de usuario
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Interfaz para el inicio de sesión
export interface LoginData {
  email: string;
  password: string;
}

// Servicio de autenticación
export const authService = {
  // Registrar un nuevo usuario
  async register(data: RegisterData): Promise<User | null> {
    try {
      // Verificar si el correo ya existe
      const checkResult = await executeSql(
        'SELECT * FROM users WHERE email = ?',
        [data.email]
      );
      
      if (checkResult.rows.length > 0) {
        Alert.alert('Error', 'Este correo electrónico ya está registrado');
        return null;
      }
      
      // Crear el nuevo usuario
      const now = new Date().toISOString();
      const result = await executeSql(
        'INSERT INTO users (name, email, password, created_at, currency, theme, notifications, week_start_day) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [data.name, data.email, data.password, now, 'MXN', 'system', 1, 0]
      );
      
      if (result.insertId) {
        // Obtener el usuario recién creado
        const userResult = await executeSql(
          'SELECT * FROM users WHERE id = ?',
          [result.insertId]
        );
        
        if (userResult.rows.length > 0) {
          const user = userResult.rows.item(0);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            currency: user.currency,
            theme: user.theme,
            notifications: Boolean(user.notifications),
            weekStartDay: user.week_start_day
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'No se pudo completar el registro');
      return null;
    }
  },
  
  // Iniciar sesión
  async login(data: LoginData): Promise<User | null> {
    try {
      const result = await executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [data.email, data.password]
      );
      
      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currency: user.currency,
          theme: user.theme,
          notifications: Boolean(user.notifications),
          weekStartDay: user.week_start_day
        };
      }
      
      Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
      return null;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión');
      return null;
    }
  },
  
  // Obtener usuario actual por ID
  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await executeSql(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      
      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          currency: user.currency,
          theme: user.theme,
          notifications: Boolean(user.notifications),
          weekStartDay: user.week_start_day
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }
};