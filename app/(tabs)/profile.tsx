import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#B0C4E0', dark: '#2A2A4A' }}
      headerImage={<IconSymbol size={120} name="person.fill" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Perfil</ThemedText>
        
        <ThemedView style={styles.profileCard}>
          <ThemedText type="subtitle">Información Personal</ThemedText>
          <ThemedText>Nombre: Usuario</ThemedText>
          <ThemedText>Correo: usuario@ejemplo.com</ThemedText>
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
          <Pressable style={({ pressed }) => [styles.buttonPlaceholder, pressed && { opacity: 0.8 }]} onPress={() => { /* TODO: Implement logout logic */ }}>
            <ThemedText style={{ color: '#E04343', textAlign: 'center', fontWeight: 'bold' }}>Cerrar Sesión</ThemedText>
          </Pressable>
        </ThemedView>
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
  buttonPlaceholder: {
    backgroundColor: 'rgba(224, 67, 67, 0.2)',
    color: '#E04343',
    textAlign: 'center',
    padding: 16,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});