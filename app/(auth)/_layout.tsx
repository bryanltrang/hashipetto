import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
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
