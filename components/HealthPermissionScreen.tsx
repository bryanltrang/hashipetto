// New file: prompt screen for Apple HealthKit permissions
import { Alert, Linking } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedPressable } from './ThemedPressable';
import { useHealthPermissions } from '@/hooks/useHealthPermissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HealthPermissionScreenProps {
  onDone?: () => void;
}

export const HEALTH_PERMISSION_PROMPT_KEY = 'healthPermissionPromptShown';

export default function HealthPermissionScreen({ onDone }: HealthPermissionScreenProps) {
  const { requestPermissions, isLoading } = useHealthPermissions();

  const finishFlow = async () => {
    await AsyncStorage.setItem(HEALTH_PERMISSION_PROMPT_KEY, 'true');
    onDone?.();
  };

  const handleRequestPermissions = async () => {
    const granted = await requestPermissions();
    console.log('handleRequestPermissions granted', granted);
    if (granted) {
      await finishFlow();
    } else {
      Alert.alert(
        'Health Access Required',
        'To track your activity and keep your pet healthy, please enable Health permissions in Settings.',
        [
          {
            text: 'Not Now',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
      );
    }
  };

  return (
    <ThemedView className="flex-1 justify-center items-center p-6 bg-amber-50">
      <ThemedView className="items-center mb-8">
        <ThemedText
          style={{ fontFamily: 'DisplayDots' }}
          className="text-4xl text-center mb-4 text-amber-800"
        >
          🩺 Health Access
        </ThemedText>

        <ThemedText className="text-lg text-center mb-6 text-gray-700 leading-6">
          Enable access to your Apple Health data so we can accurately track your activity and care for your virtual pet!
        </ThemedText>
      </ThemedView>

      <ThemedView className="w-full">
        <ThemedPressable
          className="bg-amber-400 mb-4 rounded-lg overflow-hidden"
          onPress={handleRequestPermissions}
          disabled={isLoading}
        >
          <ThemedText className="text-center text-lg font-bold text-amber-900 leading-12">
            {isLoading ? 'Requesting...' : 'Enable Health Access'}
          </ThemedText>
        </ThemedPressable>
      </ThemedView>
    </ThemedView>
  );
} 