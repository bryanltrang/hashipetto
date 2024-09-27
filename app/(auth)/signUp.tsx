import EmailSignUp from '@/components/auth/emailSignup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function SignUpScreen() {
  return (
    <ThemedView>
      <EmailSignUp />

      <ThemedView>
        <ThemedText>Have an account?</ThemedText>
        <Link href="/signIn">
          <ThemedText>Sign In</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}
