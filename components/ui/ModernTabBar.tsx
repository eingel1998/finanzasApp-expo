import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';


import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol, IconSymbolName } from './IconSymbol';

const { width } = Dimensions.get('window');



type ModernTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export function ModernTabBar({ state, descriptors, navigation }: ModernTabBarProps) {
  const colorScheme = useColorScheme() || 'light';
  const isDark = colorScheme === 'dark';
  
  // Valores para animaciones
  const tabPosition = useSharedValue(0);
  
  
  // Definir colores basados en el tema
  const primaryColor = isDark ? Colors.primary.dark : Colors.primary.light;
  const secondaryTextColor = isDark ? Colors.text.secondaryDark : Colors.text.secondaryLight;

  // Actualizar la posición del indicador cuando cambia la pestaña activa
  useEffect(() => {
    const tabWidth = width / state.routes.length;
    tabPosition.value = withSpring(state.index * tabWidth, {
      damping: 15,
      stiffness: 120,
    });
  }, [state.index, state.routes.length, tabPosition]);

  // Estilo animado para el indicador de pestaña activa
  const indicatorStyle = useAnimatedStyle(() => {
    const tabWidth = width / state.routes.length;
    return {
      transform: [{ translateX: tabPosition.value }],
      width: tabWidth,
    };
  });

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {/* Indicador de pestaña activa */}
      <Animated.View style={[styles.indicator, indicatorStyle, isDark ? styles.indicatorDark : styles.indicatorLight]} />
      
      {/* Pestañas */}
      <View style={styles.tabsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          // Acortar la etiqueta para 'transactions' si no hay un título definido
          let label = options.title || route.name;
          if (route.name === 'transactions' && !options.title) {
            label = 'Transacciones'; // O un nombre más corto como 'Movimientos'
          }
          const isFocused = state.index === index;
          
          // Determinar el color del ícono basado en el estado y el tema
          const iconColor = isFocused ? primaryColor : secondaryTextColor;
          
          // Obtener el nombre del ícono basado en la ruta
          let iconName: IconSymbolName | '' = '';
          switch (route.name) {
            case 'index':
              iconName = 'chart.pie.fill';
              break;
            case 'transactions':
              iconName = 'arrow.left.arrow.right';
              break;
            case 'add':
              iconName = 'plus.circle.fill';
              break;
            case 'budget':
              iconName = 'banknote';
              break;
            case 'profile':
              iconName = 'person.fill';
              break;
            default:
              iconName = 'questionmark.circle';
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
              
              // Feedback háptico al cambiar de pestaña
              if (process.env.EXPO_OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tab}
            >
              <View style={[
                styles.tabContent
              ]}>
                <IconSymbol 
                  name={iconName} 
                  size={isFocused ? 28 : 24} 
                  color={iconColor} 
                />

              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadows.light.medium,
    paddingBottom: Spacing.sm, // Añadir espaciado inferior
  },
  containerLight: {
    backgroundColor: Colors.background.light,
    borderTopColor: Colors.border.light,
    borderTopWidth: 1,
  },
  containerDark: {
    backgroundColor: Colors.background.dark,
    borderTopColor: Colors.border.dark,
    borderTopWidth: 1,
  },
  indicator: {
    position: 'absolute',
    height: 4,
    top: 0,
    borderRadius: BorderRadius.round,
  },
  indicatorLight: {
    backgroundColor: Colors.primary.light,
  },
  indicatorDark: {
    backgroundColor: Colors.primary.dark,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
  },
  activeTabContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Fondo semi-transparente para la pestaña activa que funciona en ambos modos
  },
  tabLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium as any,
  },
  textLight: {
    color: Colors.text.light,
  },
  textDark: {
    color: Colors.text.dark,
  },
});