import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const { user } = useUser();
  return (
    <ThemedView style={{ marginTop: 64 }}>
      <ThemedText>Welcome to your profile {user?.firstName}</ThemedText>
    </ThemedView>
  );
}
