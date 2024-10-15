import { ThemedLink } from '@/components/ThemedLinkButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Redirect } from 'expo-router';

export default function Login() {
  return (
    <ThemedView className="mt-[64px] p-4">
      <SignedOut>
        <ThemedText
          style={{ fontFamily: 'DisplayDots' }}
          className="text-center text-5xl mb-[16px]">
          Hashipets
        </ThemedText>
        <ThemedText
          style={{ fontFamily: 'DisplayDots' }}
          className="text-center text-lg mb-[16px]">
          A new friend awaits...
        </ThemedText>
        <ThemedLink
          push
          href="/(auth)/signUp"
          className="text-center text-base font-semibold overflow-hidden bg-amber-300 leading-10 mb-4 rounded-md">
          Create an account
        </ThemedLink>
        <ThemedLink
          push
          href="/(auth)/signIn"
          className="text-center text-base font-semibold border overflow-hidden bg-slate-100 border-slate-200 leading-10 rounded-md">
          Log In
        </ThemedLink>
      </SignedOut>
      <SignedIn>
        <Redirect href={'/(tabs)/'} />
      </SignedIn>
    </ThemedView>
  );
}
