import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export interface LocationPermissionState {
  hasPermission: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export const useLocationPermissions = () => {
  const [permissionState, setPermissionState] = useState<LocationPermissionState>({
    hasPermission: null,
    isLoading: true,
    error: null,
  });

  const checkPermissions = async () => {
    try {
      setPermissionState(prev => ({ ...prev, isLoading: true, error: null }));
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionState({
        hasPermission: status === 'granted',
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setPermissionState({
        hasPermission: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to check permissions',
      });
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      setPermissionState(prev => ({ ...prev, isLoading: true, error: null }));
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      
      setPermissionState({
        hasPermission: granted,
        isLoading: false,
        error: null,
      });
      
      return granted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request permissions';
      setPermissionState({
        hasPermission: false,
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    ...permissionState,
    requestPermissions,
    checkPermissions,
  };
}; 