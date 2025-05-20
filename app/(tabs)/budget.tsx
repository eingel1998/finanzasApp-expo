import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';

export default function BudgetScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0C4B0', dark: '#4A2A2A' }}
      headerImage={<IconSymbol size={120} name="banknote" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Presupuestos</ThemedText>
        
        <ThemedView style={styles.summaryCard}>
          <ThemedText type="subtitle">Resumen de Presupuestos</ThemedText>
          <ThemedText>Presupuesto mensual: $0.00</ThemedText>
          <ThemedText>Gastado: $0.00</ThemedText>
          <ThemedText>Restante: $0.00</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Presupuestos por Categoría</ThemedText>
          <ThemedText style={styles.emptyState}>No hay presupuestos configurados</ThemedText>
          {/* Aquí irá la lista de presupuestos por categoría */}
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.buttonPlaceholder}>Crear Nuevo Presupuesto</ThemedText>
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
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  section: {
    marginVertical: 16,
  },
  emptyState: {
    fontStyle: 'italic',
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
  },
  buttonPlaceholder: {
    backgroundColor: 'rgba(10, 126, 164, 0.2)',
    color: '#0a7ea4',
    textAlign: 'center',
    padding: 16,
    borderRadius: 8,
    fontWeight: 'bold',
  },
});