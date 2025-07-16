import { Alert, Linking } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedPressable } from './ThemedPressable';
import { useLocationPermissions } from '@/hooks/useLocationPermissions';

interface LocationPermissionScreenProps {
  onPermissionGranted?: () => void;
}

export default function LocationPermissionScreen({ onPermissionGranted }: LocationPermissionScreenProps) {
  const { requestPermissions, isLoading } = useLocationPermissions();

  const handleRequestPermissions = async () => {
    const granted = await requestPermissions();
    
    if (granted) {
      onPermissionGranted?.();
    } else {
      // Show alert suggesting user to go to settings if permission was denied
      Alert.alert(
        'Location Permission Required',
        'To track your running activities with your virtual pet, please enable location access in your device settings.',
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
        ]
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
          📍 Location Access
        </ThemedText>
        
        <ThemedText className="text-lg text-center mb-6 text-gray-700 leading-6">
          Enable location services to track your running activities and help your virtual pet grow stronger!
        </ThemedText>
        
        <ThemedView className="bg-amber-100 p-4 rounded-lg mb-6 border border-amber-200">
          <ThemedText className="text-center text-sm text-amber-800 mb-2 font-medium">
            Why we need location access:
          </ThemedText>
          <ThemedText className="text-center text-sm text-amber-700">
            • Track your running distance and routes{'\n'}
            • Reward your pet based on your activity{'\n'}
            • Create a fun fitness experience
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView className="w-full">
        <ThemedPressable
          className="bg-amber-400 mb-4 rounded-lg overflow-hidden"
          onPress={handleRequestPermissions}
          disabled={isLoading}
        >
          <ThemedText className="text-center text-lg font-bold text-amber-900 leading-12">
            {isLoading ? 'Requesting...' : 'Enable Location Access'}
          </ThemedText>
        </ThemedPressable>
        
      </ThemedView>
    </ThemedView>
  );
} 