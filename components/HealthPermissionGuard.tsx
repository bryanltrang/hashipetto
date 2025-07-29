// New file: Guard that ensures Health permission prompt has been completed
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { HEALTH_PERMISSION_PROMPT_KEY } from './HealthPermissionScreen';

interface HealthPermissionGuardProps {
  children: React.ReactNode;
}

export default function HealthPermissionGuard({ children }: HealthPermissionGuardProps) {
  const router = useRouter();
  const [promptShown, setPromptShown] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(HEALTH_PERMISSION_PROMPT_KEY);
      setPromptShown(!!value);
    })();
  }, []);

  useEffect(() => {
    if (promptShown === false) {
      // @ts-ignore – expo-router accepts plain string paths
      router.replace('/health-permission');
    }
  }, [promptShown, router]);

  if (promptShown === null) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-lg">Checking Health access...</ThemedText>
      </ThemedView>
    );
  }

  if (promptShown === false) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-lg">Redirecting...</ThemedText>
      </ThemedView>
    );
  }

  return <>{children}</>;
} 