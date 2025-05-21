import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { initDatabase } from '@/database/database';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';

// Componente interno que maneja la navegación basada en el estado de autenticación
function RootLayoutNav() {
  // Usamos _user para indicar que la variable es intencional pero no se usa actualmente
  const { user: _user, isLoading } = useAuth();
  const colorScheme = useColorScheme();

  if (isLoading) {
    // Podríamos mostrar un indicador de carga aquí
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Siempre mostramos las pestañas principales, pero el perfil manejará si el usuario está autenticado o no */}
        <Stack.Screen name="(tabs)" />
        {/* Ruta de autenticación accesible aunque el usuario no esté autenticado */}
        <Stack.Screen name="auth" />
        {/* Esta ruta es para manejar rutas no encontradas dentro del stack principal */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Inicializar la base de datos al cargar la aplicación
  useEffect(() => {
    initDatabase();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
