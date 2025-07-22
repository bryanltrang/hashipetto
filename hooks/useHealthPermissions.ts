// New file: useHealthPermissions hook for Apple HealthKit permission management
import { useEffect, useState } from 'react';
import AppleHealthKit from 'react-native-health';

export interface HealthPermissionState {
  hasPermission: boolean | null;
  isLoading: boolean;
  error: string | null;
}

const permissions = {
  permissions: {
    read : [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
    write: [],
  },
};

const initHealthKitAsync = (): Promise<boolean> => {
  return new Promise(resolve => {
    AppleHealthKit.initHealthKit(permissions, (error: string | null, result?: boolean) => {
      resolve(!error && result === true);
    });
  });
};

export const useHealthPermissions = () => {
  const [state, setState] = useState<HealthPermissionState>({
    hasPermission: null,
    isLoading: true,
    error: null,
  });

  const checkPermissions = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // There is no direct async "getAuthStatus" promise API, so try a lightweight init with no prompt.
      // If already authorized the callback will succeed immediately without popping UI.
      const authorized = await initHealthKitAsync();

      setState({
        hasPermission: authorized,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        hasPermission: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to check Health permissions',
      });
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const granted = await initHealthKitAsync();
      console.log('requestPermissions granted', granted);
      setState({ hasPermission: granted, isLoading: false, error: null });
      return granted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request Health permissions';
      setState({ hasPermission: false, isLoading: false, error: errorMessage });
      return false;
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    ...state,
    checkPermissions,
    requestPermissions,
  };
}; 