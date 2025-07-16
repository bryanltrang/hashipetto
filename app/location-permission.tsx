import { useRouter } from 'expo-router';
import LocationPermissionScreen from '@/components/LocationPermissionScreen';

export default function LocationPermissionRoute() {
  const router = useRouter();

  const handlePermissionGranted = () => {
    // Redirect to home after permission is granted
    router.replace('/(tabs)/home');
  };

  return (
    <LocationPermissionScreen onPermissionGranted={handlePermissionGranted} />
  );
} 