import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';

export default function TransactionsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#B8D0E0', dark: '#2A3C4A' }}
      headerImage={<IconSymbol size={120} name="arrow.left.arrow.right" color="#FFFFFF" style={styles.headerIcon} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Transacciones</ThemedText>
        
        <ThemedView style={styles.filtersContainer}>
          <ThemedText type="defaultSemiBold">Filtros</ThemedText>
          {/* Aquí irán los filtros de transacciones */}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Historial de Transacciones</ThemedText>
          <ThemedText style={styles.emptyState}>No hay transacciones registradas</ThemedText>
          {/* Aquí irá la lista de transacciones */}
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
  filtersContainer: {
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