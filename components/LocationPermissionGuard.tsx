import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useLocationPermissions } from '@/hooks/useLocationPermissions';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface LocationPermissionGuardProps {
  children: React.ReactNode;
  requireLocation?: boolean;
}

export default function LocationPermissionGuard({ 
  children, 
  requireLocation = true 
}: LocationPermissionGuardProps) {
  const { hasPermission, isLoading } = useLocationPermissions();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && requireLocation) {
      if (hasPermission === false) {
        // Redirect to location permission screen if permission is not granted
        router.replace('/location-permission');
      }
    }
  }, [hasPermission, isLoading, requireLocation, router]);

  // Show loading while checking permissions
  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-lg">Checking permissions...</ThemedText>
      </ThemedView>
    );
  }

  // If location is required and permission is not granted, don't render children
  // (the useEffect will handle the redirect)
  if (requireLocation && hasPermission === false) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-lg">Redirecting...</ThemedText>
      </ThemedView>
    );
  }

  return <>{children}</>;
} 