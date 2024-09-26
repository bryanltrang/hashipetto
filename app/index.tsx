import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Link } from 'expo-router';

export default function Login() {
  const { user } = useUser();
  return (
    <ThemedView>
      <ThemedText type="title">Welcome to Hashipetto</ThemedText>
      <SignedOut>
        <ThemedText type="title">Sign up!</ThemedText>
        <Link href="/(auth)/sign-up">
          <ThemedText>Create an account</ThemedText>
        </Link>
        <Link href="/(auth)/sign-in">
          <ThemedText>Log In</ThemedText>
        </Link>
      </SignedOut>

      <SignedIn>
        {/* this is where you would show tabs and navigation because the user is logged in */}
        <ThemedText>Hello {user?.emailAddresses[0].emailAddress}</ThemedText>
      </SignedIn>
    </ThemedView>
  );
}
