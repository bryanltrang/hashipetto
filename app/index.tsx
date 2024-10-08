import { ThemedLinkButton } from '@/components/ThemedLinkButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';

export default function Login() {
  return (
    <ThemedView className="mt-[64px]">
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          className="w-[100%] mt-[60px]">
          <ThemedLinkButton
            push
            href="/(auth)/signUp"
            className="text-center text-base font-semibold bg-amber-300 h-10 leading-10 mb-4 w-[90%]">
            Create an account
          </ThemedLinkButton>
          <ThemedLinkButton
            push
            href="/(auth)/signIn"
            className="text-center text-base font-semibold border bg-slate-100 border-slate-200 h-10 leading-10 w-[90%]">
            Log In
          </ThemedLinkButton>
        </View>
      </SignedOut>
      <SignedIn>
        <Redirect href={'/(tabs)/'} />
      </SignedIn>
    </ThemedView>
  );
}
