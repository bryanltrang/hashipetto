// New route: /health-permission
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import HealthPermissionScreen, { HEALTH_PERMISSION_PROMPT_KEY } from '@/components/HealthPermissionScreen';
import { useHealthPermissions } from '@/hooks/useHealthPermissions';

export default function HealthPermissionRoute() {
  const router = useRouter();
  const { hasPermission } = useHealthPermissions();
  const [promptChecked, setPromptChecked] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const promptSeen = await AsyncStorage.getItem(HEALTH_PERMISSION_PROMPT_KEY);
      if (promptSeen) {
        router.replace('/(tabs)/home');
      } else {
        if (hasPermission) {
          await AsyncStorage.setItem(HEALTH_PERMISSION_PROMPT_KEY, 'true');
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

  return <HealthPermissionScreen onDone={handleDone} />;
} 