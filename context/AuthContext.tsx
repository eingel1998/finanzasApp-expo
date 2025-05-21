import { authService, LoginData, RegisterData, User } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Definir la interfaz del contexto
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde AsyncStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          const userData = JSON.parse(userJson);
          // Verificar que el usuario sigue existiendo en la base de datos
          const currentUser = await authService.getUserById(userData.id);
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Función para iniciar sesión
  const login = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(data);
      if (loggedUser) {
        setUser(loggedUser);
        await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(data);
      if (newUser) {
        setUser(newUser);
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};