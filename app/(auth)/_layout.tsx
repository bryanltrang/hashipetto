import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  // Redirect to the tabs if the user is signed in
  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="signUp"
        options={{
          headerTitle: 'Create Account',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="signIn"
        options={{ headerTitle: 'Sign In', headerBackTitleVisible: false }}
      />
    </Stack>
  );
}
