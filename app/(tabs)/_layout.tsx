import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Ejercicios',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.strengthtraining.traditional" color={color} />,
        }}
      />
        <Tabs.Screen
          name="auth"
          options={{
            title: 'Iniciar sesión',
            tabBarIcon: ({ color }) => (<IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="muscles"
        options={{
          title: 'Músculos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.arms.open" color={color} />,
        }}
      />
    </Tabs>
  );
}
