import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { BorderRadius, Spacing } from '@/constants/Theme';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface SettingsItemProps {
  icon: IconSymbolName;
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  rightElement, 
  onPress, 
  disabled = false 
}: SettingsItemProps) {
  // Validación defensiva para el icono
  const isValidIcon = icon && typeof icon === 'string';
  if (__DEV__ && !isValidIcon) {
    console.error('SettingsItem: icon inválido:', icon);
  }
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        onPress && pressed && styles.pressed,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || !onPress}
    >
      <View style={styles.iconContainer}>
        {isValidIcon ? (
          <IconSymbol name={icon as IconSymbolName} size={22} color={disabled ? '#9E9E9E' : "#000000"} />
        ) : (
          <IconSymbol name="help" size={22} color="#FF0000" />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <ThemedText style={[styles.title, disabled && styles.disabledText]}>
          {title}
        </ThemedText>
        {subtitle && (
          <ThemedText style={[styles.subtitle, disabled && styles.disabledText]}>
            {subtitle}
          </ThemedText>
        )}
      </View>
      
      {rightElement ? (
        <View style={styles.rightElementContainer}>
          {rightElement}
        </View>      ) : onPress ? (
        <IconSymbol name="chevron.right" size={16} color="#000000" style={styles.chevron} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: Spacing.md,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  disabledText: {
    opacity: 0.5,
  },
  rightElementContainer: {
    marginLeft: Spacing.sm,
  },
  chevron: {
    opacity: 0.5,
  }
});
