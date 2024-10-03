import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { TextInput, Button } from 'react-native';
import { useCallback, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ClerkAPIError } from '@clerk/types';
import { ErrorMessageCodes } from '@/constants/ErrorMessageCodes';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setErrors(err.errors as ClerkAPIError[]);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <ThemedView>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors?.map((error) => {
        return <ThemedText>{ErrorMessageCodes[error.message]}</ThemedText>;
      })}

      <Button title="Sign In" onPress={onSignInPress} />
      <ThemedView>
        <ThemedText>Don't have an account?</ThemedText>
        <Link href="/signUp">
          <ThemedText>Sign up</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}
