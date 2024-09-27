import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const { user } = useUser();
  console.log('user?.firstName', user?.firstName);
  return (
    <ThemedView style={{ marginTop: 64 }}>
      <ThemedText>Welcome home {user?.firstName}</ThemedText>
    </ThemedView>
  );
}
