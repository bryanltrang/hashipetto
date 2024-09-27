import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedOut } from '@clerk/clerk-react';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <ThemedView style={{ marginTop: 64 }}>
      <SignedOut>
        <ThemedText type="title">Welcome to Hashipetto</ThemedText>
        <Link push href="/(auth)/signUp">
          <ThemedText>Create an account</ThemedText>
        </Link>
        <Link push href="/(auth)/signIn">
          <ThemedText>Log In</ThemedText>
        </Link>
      </SignedOut>
    </ThemedView>
  );
}
