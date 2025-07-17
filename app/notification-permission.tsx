import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import NotificationPermissionScreen, { NOTIFICATION_PROMPT_KEY } from '@/components/NotificationPermissionScreen';
import { useNotificationPermissions } from '@/hooks/useNotificationPermissions';

export default function NotificationPermissionRoute() {
  const router = useRouter();
  const { hasPermission } = useNotificationPermissions();
  const [promptChecked, setPromptChecked] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const promptSeen = await AsyncStorage.getItem(NOTIFICATION_PROMPT_KEY);
      if (promptSeen) {
        router.replace('/(tabs)/home');
      } else {
        if (hasPermission) {
          await AsyncStorage.setItem(NOTIFICATION_PROMPT_KEY, 'true');
          router.replace('/(tabs)/home');
        } else {
          setPromptChecked(true);
        }
      }
    })();
  }, [hasPermission, router]);

  const handleDone = () => {
    router.replace('/(tabs)/home');
  };

  if (promptChecked === null) {
    return null;
  }

  return <NotificationPermissionScreen onDone={handleDone} />;
} 