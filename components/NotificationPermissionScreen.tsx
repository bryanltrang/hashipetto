import { Alert, Linking } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedPressable } from './ThemedPressable';
import { useNotificationPermissions } from '@/hooks/useNotificationPermissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationPermissionScreenProps {
  onDone?: () => void;
}

export const NOTIFICATION_PROMPT_KEY = 'notificationPermissionPromptShown';

export default function NotificationPermissionScreen({ onDone }: NotificationPermissionScreenProps) {
  const { requestPermissions, isLoading } = useNotificationPermissions();

  const finishFlow = async () => {
    await AsyncStorage.setItem(NOTIFICATION_PROMPT_KEY, 'true');
    onDone?.();
  };

  const handleRequestPermissions = async () => {
    const granted = await requestPermissions();

    if (granted) {
      await finishFlow();
    } else {
      // Show alert suggesting user to go to settings if permission was denied
      Alert.alert(
        'Stay Updated!',
        'To receive timely reminders and updates for your virtual pet, please enable push notifications in your device settings.',
        [
          {
            text: 'Not Now',
            style: 'cancel',
            onPress: finishFlow,
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
              finishFlow();
            },
          },
        ],
      );
    }
  };

  const handleSkip = async () => {
    await finishFlow();
  };

  return (
    <ThemedView className="flex-1 justify-center items-center p-6 bg-amber-50">
      <ThemedView className="items-center mb-8">
        <ThemedText 
          style={{ fontFamily: 'DisplayDots' }}
          className="text-4xl text-center mb-4 text-amber-800"
        >
          🔔 Notifications
        </ThemedText>
        
        <ThemedText className="text-lg text-center mb-6 text-gray-700 leading-6">
          Enable push notifications to receive reminders and celebrate milestones with your virtual pet!
        </ThemedText>
      </ThemedView>

      <ThemedView className="w-full">
        <ThemedPressable
          className="bg-amber-400 mb-4 rounded-lg overflow-hidden"
          onPress={handleRequestPermissions}
          disabled={isLoading}
        >
          <ThemedText className="text-center text-lg font-bold text-amber-900 leading-12">
            {isLoading ? 'Requesting...' : 'Enable Notifications'}
          </ThemedText>
        </ThemedPressable>

        <ThemedPressable
          className="bg-gray-200 rounded-lg overflow-hidden"
          onPress={handleSkip}
          disabled={isLoading}
        >
          <ThemedText className="text-center text-lg font-bold text-gray-700 leading-12">
            Maybe Later
          </ThemedText>
        </ThemedPressable>
      </ThemedView>
    </ThemedView>
  );
} 