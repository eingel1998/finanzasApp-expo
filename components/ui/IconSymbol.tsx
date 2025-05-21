// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols'; // SymbolViewProps removido
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // SF Symbol Name / Custom Name : Material Icon Name
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chart.pie.fill': 'pie-chart',
  'arrow.left.arrow.right': 'swap-horiz',
  'plus.circle.fill': 'add-circle',
  'banknote': 'account-balance-wallet',
  'person.fill': 'person',
  'questionmark.circle': 'help-outline',
  'gear': 'settings',
  'person.circle': 'account-circle',
  'person.crop.circle': 'account-circle',
  'logout': 'logout', // Usaremos 'logout' como custom key si SF no tiene directo
  'colorSwatch': 'palette', // Usaremos 'colorSwatch' como custom key
  'bell': 'notifications',
  'currencyDollar': 'attach-money',
  'arrowDownToLine': 'download',
  'arrowUpFromLine': 'upload',
  'infoCircle': 'info',
  'shieldCheck': 'security',
  'documentText': 'description',
  'moon.fill': 'dark-mode', // Equivalente Material Icons
  'info.circle.fill': 'info', // Equivalente Material Icons
  'shield.lefthalf.filled': 'security', // Equivalente Material Icons
  'doc.text.fill': 'description', // Equivalente Material Icons
  'plus.circle': 'add-circle-outline', // Equivalente para plus.circle
  'sun.max.fill': 'wb-sunny', // Equivalente para tema claro
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight; // Aunque no se usa con MaterialIcons, lo mantenemos por consistencia de props
}) {
  // Validación estricta para evitar errores de renderizado
  if (!name || typeof name !== 'string') {
    if (__DEV__) {
      console.error('IconSymbol: El nombre del icono es inválido o vacío.');
    }
    return null;
  }
  const iconName = MAPPING[name];
  if (!iconName) {
    // Si el nombre no está mapeado, advertimos y usamos un icono de ayuda
    if (__DEV__) {
      console.warn(`IconSymbol: El nombre de icono '${name}' no está mapeado. Usando 'help' como fallback.`);
    }
    return <MaterialIcons color={color} size={size} name="help" style={style} />;
  }
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
