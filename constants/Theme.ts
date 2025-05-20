/**
 * Constantes de diseño para FinanzasApp
 * Este archivo contiene todas las constantes relacionadas con el diseño visual de la aplicación,
 * incluyendo colores, espaciados, radios de bordes y tipografía.
 */

// Paleta de colores principal
export const Colors = {
  // Colores primarios
  primary: {
    light: '#0A7EA4', // Azul principal
    dark: '#1AACDC',  // Versión más clara para modo oscuro
  },
  // Colores secundarios
  secondary: {
    light: '#4CAF50', // Verde para indicar valores positivos
    dark: '#6BCF6F',  // Versión más clara para modo oscuro
  },
  // Colores de acento
  accent: {
    light: '#FF5722', // Naranja para llamadas a la acción
    dark: '#FF7D50',  // Versión más clara para modo oscuro
  },
  // Colores para gastos
  expense: {
    light: '#E53935', // Rojo para gastos
    dark: '#FF5252',  // Versión más clara para modo oscuro
  },
  // Colores para ingresos
  income: {
    light: '#43A047', // Verde para ingresos
    dark: '#66BB6A',  // Versión más clara para modo oscuro
  },
  // Colores para fondos
  background: {
    light: '#FFFFFF', // Fondo principal en modo claro
    dark: '#121212',  // Fondo principal en modo oscuro
    secondaryLight: '#F5F5F5', // Fondo secundario en modo claro
    secondaryDark: '#1E1E1E',  // Fondo secundario en modo oscuro
  },
  // Colores para texto
  text: {
    light: '#212121', // Texto principal en modo claro
    dark: '#E0E0E0',  // Texto principal en modo oscuro
    secondaryLight: '#757575', // Texto secundario en modo claro
    secondaryDark: '#9E9E9E',  // Texto secundario en modo oscuro
    disabledLight: '#BDBDBD', // Texto deshabilitado en modo claro
    disabledDark: '#616161',  // Texto deshabilitado en modo oscuro
  },
  // Colores para bordes
  border: {
    light: '#E0E0E0', // Bordes en modo claro
    dark: '#333333',  // Bordes en modo oscuro
  },
  // Colores para tarjetas
  card: {
    light: '#FFFFFF', // Fondo de tarjetas en modo claro
    dark: '#1E1E1E',  // Fondo de tarjetas en modo oscuro
  },
  // Colores para categorías
  categories: {
    food: { light: '#FF9800', dark: '#FFB74D' },       // Alimentación
    transport: { light: '#2196F3', dark: '#64B5F6' },   // Transporte
    housing: { light: '#9C27B0', dark: '#BA68C8' },     // Vivienda
    entertainment: { light: '#E91E63', dark: '#F06292' }, // Entretenimiento
    health: { light: '#00BCD4', dark: '#4DD0E1' },      // Salud
    education: { light: '#3F51B5', dark: '#7986CB' },   // Educación
    shopping: { light: '#8BC34A', dark: '#AED581' },    // Compras
    other: { light: '#607D8B', dark: '#90A4AE' },       // Otros
  },
};

// Espaciados
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Radios de bordes
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999, // Para elementos circulares
};

// Sombras
export const Shadows = {
  light: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1.5,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.34,
      shadowRadius: 3.27,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
    },
  },
};

// Tipografía
export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

// Animaciones
export const Animation = {
  durations: {
    short: 150,
    medium: 300,
    long: 500,
  },
};

// Exportación por defecto para facilitar la importación
export default {
  Colors,
  Spacing,
  BorderRadius,
  Shadows,
  Typography,
  Animation,
};