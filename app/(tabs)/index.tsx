import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';

export default function AddTransactionScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#C4E0B0', dark: '#2A4A2A' }}
      headerImage={<IconSymbol size={120} name="plus.circle.fill" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Añadir Transacción</ThemedText>
        
        <ThemedView style={styles.formContainer}>
          <ThemedText type="subtitle">Nueva Transacción</ThemedText>
          <ThemedText style={styles.formLabel}>Tipo de Transacción</ThemedText>
          {/* Aquí irán los botones de tipo (ingreso/gasto) */}
          
          <ThemedText style={styles.formLabel}>Monto</ThemedText>
          {/* Aquí irá el campo de monto */}
          
          <ThemedText style={styles.formLabel}>Categoría</ThemedText>
          {/* Aquí irá el selector de categoría */}
          
          <ThemedText style={styles.formLabel}>Fecha</ThemedText>
          {/* Aquí irá el selector de fecha */}
          
          <ThemedText style={styles.formLabel}>Descripción</ThemedText>
          {/* Aquí irá el campo de descripción */}
          
          {/* Botón de guardar */}
          <ThemedText style={styles.buttonPlaceholder}>Guardar Transacción</ThemedText>
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
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  formLabel: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonPlaceholder: {
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
    color: '#0a7ea4',
    textAlign: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    fontWeight: 'bold',
  },
});