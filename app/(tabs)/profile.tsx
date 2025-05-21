import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // Handle context not being available yet
  if (!authContext) {
    // You might want to render a loading indicator or a fallback UI
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Cargando...</ThemedText>
      </ThemedView>
    );
  }

  const { user, logout } = authContext;

  const handleLogout = async () => {
    if (logout) {
      await logout();
      // Optionally, navigate to home or login screen after logout
      router.replace('/'); 
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleRegister = () => {
    // Assuming you have a register screen at /auth/register
    router.push('/auth/register'); 
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#B0C4E0', dark: '#2A2A4A' }}
      headerImage={
        <IconSymbol 
          size={120} 
          name={user ? "person.fill" : "lock.fill"} 
          color="#FFFFFF" 
          style={styles.headerIcon} 
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">{user ? 'Perfil de Usuario' : 'Acceso Requerido'}</ThemedText>
        
        {user ? (
          <>
            <ThemedView style={styles.profileCard}>
              <ThemedText type="subtitle">Información Personal</ThemedText>
              <ThemedText>Nombre: {user.name}</ThemedText>
              <ThemedText>Correo: {user.email}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText type="subtitle">Preferencias</ThemedText>
              <ThemedText style={styles.settingLabel}>Tema</ThemedText>
              {/* Aquí irá el selector de tema (claro/oscuro) */}
              
              <ThemedText style={styles.settingLabel}>Moneda</ThemedText>
              {/* Aquí irá el selector de moneda */}
              
              <ThemedText style={styles.settingLabel}>Notificaciones</ThemedText>
              {/* Aquí irán las opciones de notificaciones */}
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText type="subtitle">Estadísticas</ThemedText>
              <ThemedText>Transacciones registradas: 0</ThemedText>
              <ThemedText>Presupuestos activos: 0</ThemedText>
              <ThemedText>Metas de ahorro: 0</ThemedText>
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
              <Pressable style={({ pressed }) => [styles.button, styles.logoutButton, pressed && { opacity: 0.8 }]} onPress={handleLogout}>
                <ThemedText style={styles.buttonText}>Cerrar Sesión</ThemedText>
              </Pressable>
            </ThemedView>
          </>
        ) : (
          <ThemedView style={styles.authPromptContainer}>
            <ThemedText type="subtitle" style={{textAlign: 'center', marginBottom: 20}}>
              Inicia sesión o crea una cuenta para acceder a tu perfil y funcionalidades.
            </ThemedText>
            <Pressable style={({ pressed }) => [styles.button, styles.loginButton, pressed && { opacity: 0.8 }]} onPress={handleLogin}>
              <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.button, styles.registerButton, pressed && { opacity: 0.8 }]} onPress={handleRegister}>
              <ThemedText style={styles.buttonText}>Registrarse</ThemedText>
            </Pressable>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerIcon: {
    opacity: 0.8,
    alignSelf: 'center',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example background, adjust for theme
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  section: {
    marginVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Example background, adjust for theme
    borderRadius: 12,
    padding: 16,
  },
  settingLabel: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24,
  },
  authPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Default text color for buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3498db', // Example login button color
  },
  registerButton: {
    backgroundColor: '#2ecc71', // Example register button color
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Example logout button color
  },
  // Deprecated, use specific button styles or make buttonText more specific
  // buttonPlaceholder: { 
  //   backgroundColor: 'rgba(224, 67, 67, 0.2)',
  //   color: '#E04343',
  //   textAlign: 'center',
  //   padding: 16,
  //   borderRadius: 8,
  //   fontWeight: 'bold',
  // },
});