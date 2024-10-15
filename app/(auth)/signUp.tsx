import EmailSignUp from '@/components/auth/emailSignup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function SignUpScreen() {
  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText
        style={{ fontFamily: 'DisplayDots' }}
        className="text-3xl mb-[16px]">
        Create an account
      </ThemedText>
      <EmailSignUp />
      <ThemedView className="flex-1 grow" />
      <ThemedView>
        <ThemedText className="text-center font-semibold mb-4">
          Have an account?
        </ThemedText>
        <Link
          href="/signIn"
          className="text-center text-base font-semibold border overflow-hidden bg-slate-100 border-slate-200 leading-10 rounded-md">
          <ThemedText>Login</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}
