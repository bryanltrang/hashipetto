import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Login() {
  return (
    <ThemedView>
      <ThemedText type="title">Welcome</ThemedText>
      <Unauthenticated>
        <ThemedText type="title">Sign up!</ThemedText>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        You're logged in
      </Authenticated>
    </ThemedView>
  );
}
