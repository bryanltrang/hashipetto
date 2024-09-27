import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {
  const { user } = useUser();
  return (
    <ThemedView>
      <ThemedText>Welcome home {user?.firstName}</ThemedText>
    </ThemedView>
  );
}
