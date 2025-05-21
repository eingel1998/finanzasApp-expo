import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'; // Importar useState y useEffect
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicialmente falso

  // Efecto para simular la verificación de autenticación al cargar la app
  useEffect(() => {
    // TODO: Implementar lógica real para verificar si el usuario está autenticado
    // Por ahora, simulamos que no está autenticado al inicio
    setIsAuthenticated(false);
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Si está autenticado, mostrar las pestañas principales
          <Stack.Screen name="(tabs)" />
        ) : (
          // Si no está autenticado, mostrar las rutas de autenticación
          <Stack.Screen name="auth" />
        )}
        {/* Esta ruta es para manejar rutas no encontradas dentro del stack principal */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
