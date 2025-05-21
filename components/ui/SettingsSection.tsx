import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BorderRadius, Spacing } from '@/constants/Theme';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      <View style={styles.content}>
        {children}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  content: {
    marginTop: Spacing.sm,
  },
});
