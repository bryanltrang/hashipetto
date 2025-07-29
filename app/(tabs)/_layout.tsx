import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LocationPermissionGuard from '@/components/LocationPermissionGuard';
import NotificationPermissionGuard from '@/components/NotificationPermissionGuard';
import HealthPermissionGuard from '@/components/HealthPermissionGuard';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <LocationPermissionGuard>
      <NotificationPermissionGuard>
        <HealthPermissionGuard>
        <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
        </Tabs>
        </HealthPermissionGuard>
      </NotificationPermissionGuard>
    </LocationPermissionGuard>
  );
}
