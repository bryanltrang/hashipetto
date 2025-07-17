import { useRouter } from 'expo-router';
import LocationPermissionScreen from '@/components/LocationPermissionScreen';

export default function LocationPermissionRoute() {
  const router = useRouter();

  const handlePermissionGranted = () => {
    // After enabling location, prompt for notifications next
    router.replace('/notification-permission');
  };

  return (
    <LocationPermissionScreen onPermissionGranted={handlePermissionGranted} />
  );
} 