import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ClerkAPIError } from '@clerk/types';
import { ErrorMessageCodes } from '@/constants/ErrorMessageCodes';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedLink } from '@/components/ThemedLinkButton';

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

  const onForgotPassword = useCallback(() => {
    console.log('forgot password');
  }, []);

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText
        style={{ fontFamily: 'DisplayDots' }}
        className="text-3xl mb-[16px]">
        Login
      </ThemedText>
      <ThemedTextInput
        className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <ThemedTextInput
        className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors?.map((error) => {
        return (
          <ThemedText className="text-base text-red-700 h-10 leading-10">
            {ErrorMessageCodes[error.code]}
          </ThemedText>
        );
      })}
      <ThemedPressable
        className="overflow-hidden bg-amber-300 mb-4 rounded-md"
        onPress={onSignInPress}>
        <ThemedText className="text-center text-base font-semibold leading-10">
          Login
        </ThemedText>
      </ThemedPressable>
      <ThemedPressable onPress={onForgotPassword}>
        <ThemedText className="text-center text-base font-semibold leading-10">
          Forgot Password
        </ThemedText>
      </ThemedPressable>
      <ThemedView className="flex-1 grow" />
      <ThemedView>
        <ThemedText className="text-center font-semibold mb-4">
          Don't have an account?
        </ThemedText>
        <ThemedLink
          href="/signUp"
          className="text-center text-base font-semibold border overflow-hidden bg-slate-100 border-slate-200 leading-10 rounded-md">
          <ThemedText>Create an account</ThemedText>
        </ThemedLink>
      </ThemedView>
    </ThemedView>
  );
}
