import { TextInput, Button, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedTextInput } from '../ThemedTextInput';
import { ThemedPressable } from '../ThemedPressable';
import { ThemedText } from '../ThemedText';
import { ClerkAPIError } from '@clerk/types';
import { ErrorMessageCodes } from '@/constants/ErrorMessageCodes';

export default function EmailSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setErrors(err.errors as ClerkAPIError[]);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/home');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      {!pendingVerification && (
        <>
          <ThemedTextInput
            className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <ThemedTextInput
            className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
            value={name}
            placeholder="Name..."
            onChangeText={(name) => setName(name)}
          />
          <ThemedTextInput
            className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <ThemedTextInput
            className="text-base bg-white border border-gray-300 rounded-md mb-4 w-full p-4 text-black"
            value={confirmPassword}
            placeholder="Confirm Password..."
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
          {errors?.map((error) => {
            return (
              <ThemedText
                key={error.code}
                className="text-base text-red-700 h-10 leading-10">
                {ErrorMessageCodes[error.code] || error.message}
              </ThemedText>
            );
          })}
          <ThemedPressable
            className="overflow-hidden bg-amber-300 mb-4 rounded-md"
            onPress={onSignUpPress}>
            <ThemedText className="text-center text-base font-semibold leading-10">
              Create account
            </ThemedText>
          </ThemedPressable>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}
