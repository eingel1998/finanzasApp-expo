import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';


import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol, IconSymbolName } from './IconSymbol';



type ModernTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

type TabLayout = {
  x: number;
  width: number;
};

export function ModernTabBar({ state, descriptors, navigation }: ModernTabBarProps) {
  const colorScheme = useColorScheme() || 'light';
  const isDark = colorScheme === 'dark';

  const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([]);
  const tabPositionX = useSharedValue(0);
  const tabWidthValue = useSharedValue(0);

  // Definir colores basados en el tema
  const primaryColor = isDark ? Colors.primary.dark : Colors.primary.light;
  const secondaryTextColor = isDark ? Colors.text.secondaryDark : Colors.text.secondaryLight;

  // Actualizar la posición del indicador cuando cambia la pestaña activa o las mediciones
  useEffect(() => {
    if (tabLayouts[state.index]) {
      const { x, width: currentTabWidth } = tabLayouts[state.index];
      tabPositionX.value = withSpring(x, {
        damping: 15,
        stiffness: 120,
      });
      tabWidthValue.value = withSpring(currentTabWidth, {
        damping: 15,
        stiffness: 120,
      });
    }
  }, [state.index, tabLayouts, tabPositionX, tabWidthValue]);

  // Estilo animado para el indicador de pestaña activa
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
      width: tabWidthValue.value,
    };
  });

  const handleTabLayout = (event: LayoutChangeEvent, index: number) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts(prevLayouts => {
      const newLayouts = [...prevLayouts];
      newLayouts[index] = { x, width };
      return newLayouts;
    });
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {/* Indicador de pestaña activa */}
      <Animated.View style={[styles.indicator, indicatorStyle, isDark ? styles.indicatorDark : styles.indicatorLight]} />
      
      {/* Pestañas */}
      <View style={styles.tabsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          
          // Determinar el color del ícono basado en el estado y el tema
          const iconColor = isFocused ? primaryColor : secondaryTextColor;
          
          // Obtener el nombre del ícono basado en la ruta
          let iconName: IconSymbolName | '' = '';
          switch (route.name) {
            case 'index':
              iconName = 'plus.circle.fill';
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
            case 'dashboard':
              iconName = 'chart.pie.fill';
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
              onLayout={(event) => handleTabLayout(event, index)} // Added onLayout
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