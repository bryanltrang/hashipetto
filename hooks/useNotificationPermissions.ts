import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

export interface NotificationPermissionState {
  hasPermission: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export const useNotificationPermissions = () => {
  const [permissionState, setPermissionState] = useState<NotificationPermissionState>({
    hasPermission: null,
    isLoading: true,
    error: null,
  });

  const checkPermissions = async () => {
    try {
      setPermissionState(prev => ({ ...prev, isLoading: true, error: null }));
      const settings = await Notifications.getPermissionsAsync();
      setPermissionState({
        hasPermission: settings.granted === true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setPermissionState({
        hasPermission: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to check notification permissions',
      });
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      setPermissionState(prev => ({ ...prev, isLoading: true, error: null }));
      const settings = await Notifications.requestPermissionsAsync();
      const granted = settings.granted === true;
      setPermissionState({
        hasPermission: granted,
        isLoading: false,
        error: null,
      });
      return granted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request notification permissions';
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