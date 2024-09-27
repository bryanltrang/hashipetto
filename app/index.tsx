import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link, Redirect } from 'expo-router';

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
      <SignedIn>
        <Redirect href={'/(tabs)/'} />
      </SignedIn>
    </ThemedView>
  );
}
