import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<IconSymbol size={120} name="chart.pie.fill" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Dashboard</ThemedText>
        
        <ThemedView style={styles.summaryCard}>
          <ThemedText type="subtitle">Resumen Financiero</ThemedText>
          <ThemedText>Balance actual: $0.00</ThemedText>
          <ThemedText>Ingresos del mes: $0.00</ThemedText>
          <ThemedText>Gastos del mes: $0.00</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Transacciones Recientes</ThemedText>
          <ThemedText style={styles.emptyState}>No hay transacciones recientes</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Distribución de Gastos</ThemedText>
          <ThemedText style={styles.emptyState}>Añade transacciones para ver estadísticas</ThemedText>
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
});