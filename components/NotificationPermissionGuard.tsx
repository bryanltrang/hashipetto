import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { NOTIFICATION_PROMPT_KEY } from './NotificationPermissionScreen';

interface NotificationPermissionGuardProps {
  children: React.ReactNode;
}

export default function NotificationPermissionGuard({ children }: NotificationPermissionGuardProps) {
  const router = useRouter();
  const [promptShown, setPromptShown] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(NOTIFICATION_PROMPT_KEY);
      setPromptShown(!!value);
    })();
  }, []);

  useEffect(() => {
    if (promptShown === false) {
      router.replace('/notification-permission');
    }
  }, [promptShown, router]);

  if (promptShown === null) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText className="text-lg">Checking notifications...</ThemedText>
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