import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Theme'; // Importar Colors
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#B0C4E0', dark: '#2A2A4A' }}
      headerImage={<IconSymbol size={120} name="person.fill" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Perfil</ThemedText>
        
        {user ? (
          // Usuario autenticado - Mostrar información del perfil
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
              <Pressable 
                style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.8 }]} 
                onPress={handleLogout}
              >
                <ThemedText style={styles.logoutButtonText}>Cerrar Sesión</ThemedText>
              </Pressable>
            </ThemedView>
          </>
        ) : (
          // Usuario no autenticado - Mostrar mensaje y botón de inicio de sesión
          <ThemedView style={styles.notAuthenticatedContainer}>
            <ThemedText style={styles.notAuthenticatedText}>
              Inicia sesión para sincronizar tus datos y acceder a todas las funcionalidades
            </ThemedText>
            
            <Pressable 
              style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.8 }]} 
              onPress={handleLogin}
            >
              <ThemedText style={styles.loginButtonText}>Iniciar Sesión / Registrarse</ThemedText>
            </Pressable>
            
            <ThemedText style={styles.infoText}>
              Puedes seguir usando la aplicación sin iniciar sesión, pero tus datos solo se guardarán en este dispositivo.
            </ThemedText>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  section: {
    marginVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  logoutButton: {
    backgroundColor: 'rgba(224, 67, 67, 0.2)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#E04343',
    fontWeight: 'bold',
  },
  notAuthenticatedContainer: {
    marginVertical: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  notAuthenticatedText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary.light, // Uso de Colors
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});