import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.error('Error signing out: ', err);
    }
  };

  return (
    <ThemedView style={{ marginTop: 64 }}>
      <ThemedText>Welcome home {user?.firstName}</ThemedText>
      <Button title={'Log Out'} onPress={handleSignOut} />
    </ThemedView>
  );
}
