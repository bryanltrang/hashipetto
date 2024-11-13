import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: 'Create Account',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ headerTitle: 'Sign In', headerBackTitleVisible: false }}
      />
    </Stack>
  );
}
