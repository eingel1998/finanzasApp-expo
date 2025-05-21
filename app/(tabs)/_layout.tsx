import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { ModernTabBar } from '@/components/ui/ModernTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Ocultamos la barra de pestañas predeterminada ya que usaremos nuestro componente personalizado
        tabBarStyle: { display: 'none' },
      }}      // Usamos nuestro componente ModernTabBar personalizado
      tabBar={props => <ModernTabBar {...props} />}
    >
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transacciones',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.left.arrow.right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.pie.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Añadir',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Presupuesto',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="banknote" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
