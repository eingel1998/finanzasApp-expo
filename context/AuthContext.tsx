import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { initDatabase } from '@/services/storage/database';
import { User, getUserByEmail, createUser, CreateUserDTO } from '@/services/storage/userService'; // Import User type and service functions

// User interface is now imported from userService

// Define the AuthContext type
interface User {
interface AuthContextType {
  user: User | null; // Use the imported User type
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>; // Password optional for now
  register: (name: string, email: string, password?: string) => Promise<boolean>; // Password optional for now
  logout: () => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Initialize database and then set loading to false
    initDatabase(); // Ensure tables are created
    setIsLoading(false);
    // TODO: Implement session persistence check here (e.g., AsyncStorage for userId)
    // For now, we start logged out.
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    console.log(`AuthContext: Attempting login for email: ${email}`);

    // TODO: Implement proper password hashing and verification when User model supports it.
    // For now, userService.getUserByEmail just checks if the email exists.
    try {
      const foundUser = await getUserByEmail(email);
      if (foundUser) {
        console.log('AuthContext: User found by service:', foundUser.id);
        setUser(foundUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        console.log('AuthContext: User not found by service for email:', email);
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('AuthContext: Login error via userService:', error);
      setIsLoading(false);
      // Propagate or handle error appropriately
      // For now, let's assume login fails if an error occurs in the service
      return false; 
    }
  };

  const register = async (name: string, email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    console.log(`AuthContext: Attempting to register user: ${email}`);

    // TODO: Store hashed password once User model and userService support it.
    // For now, password is not passed to or stored by userService.createUser
    
    try {
      // First, check if user already exists (optional, createUser might also handle this)
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        console.log('AuthContext: Registration failed - email already exists:', email);
        setIsLoading(false);
        return false; // Email already exists
      }

      // Create user object for the service
      const newUserDTO: CreateUserDTO = { name, email }; // Avatar, preferences, gamification will use defaults in service

      const registeredUser = await createUser(newUserDTO);
      
      if (registeredUser) {
        console.log('AuthContext: User registered by service:', registeredUser.id);
        setUser(registeredUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        // This case should ideally not be reached if createUser throws an error on failure
        console.log('AuthContext: Registration failed - service returned no user.');
        setIsLoading(false);
        return false; 
      }
    } catch (error) {
      console.error('AuthContext: Registration error via userService:', error);
      setIsLoading(false);
      // Propagate or handle error appropriately
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    setIsAuthenticated(false);
    // TODO: Clear any persisted session data from AsyncStorage if implemented
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
