import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

type ShineEffectProps = {
  isActive: boolean;
  width: number;
};

/**
 * Componente que añade un efecto de brillo a la pestaña activa
 * para mejorar la experiencia visual de la navegación
 */
export function TabBarShineEffect({ isActive, width }: ShineEffectProps) {
  const colorScheme = useColorScheme() || 'light';
  const isDark = colorScheme === 'dark';
  
  // Valores animados
  const shinePosition = useSharedValue(-width);
  const shineOpacity = useSharedValue(0);
  
  // Activar la animación cuando la pestaña está activa
  useEffect(() => {
    if (isActive) {
      // Resetear la posición
      shinePosition.value = -width;
      
      // Mostrar el brillo
      shineOpacity.value = withTiming(0.7, { duration: 300 });
      
      // Animar el brillo a través de la pestaña
      shinePosition.value = withTiming(width * 2, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }, () => {
        // Ocultar el brillo al finalizar
        shineOpacity.value = withTiming(0, { duration: 300 });
      });
    } else {
      // Ocultar el brillo cuando no está activa
      shineOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [isActive, shineOpacity, shinePosition, width]);
  
  // Estilo animado para el efecto de brillo
  const shineStyle = useAnimatedStyle(() => {
    return {
      opacity: shineOpacity.value,
      transform: [{ translateX: shinePosition.value }],
    };
  });
  
  return (
    <View style={[styles.container, { width }]}>
      <Animated.View 
        style={[
          styles.shine, 
          shineStyle,
          isDark ? styles.shineDark : styles.shineLight
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
    transform: [{ skewX: '-20deg' }],
  },
  shineLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  shineDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});