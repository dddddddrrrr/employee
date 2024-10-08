"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { IconGitHub, IconGoogle } from "~/components/ui/icon";
import { AuthProvider } from "~/lib/enums";
import { Button } from "./ui/button";

const SignContent = () => {
  const handleSignIn = (provider: AuthProvider) => {
    void signIn(provider);
  };

  return (
    <div className="shrink-0 rounded-2xl p-2">
      <div className="text-2xl font-bold">Sign in</div>
      <div className="mb-9 text-sm text-muted-foreground">
        Please select the login method you would like to use
      </div>
      <div className="mt-4 flex flex-col space-y-4">
        <Button
          variant="outline"
          className="w-full py-6 text-lg font-semibold"
          onClick={() => {
            handleSignIn(AuthProvider.Github);
          }}
        >
          <IconGitHub className="mr-3 h-5 w-5" />
          Sign in with GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-lg font-semibold"
          onClick={() => {
            handleSignIn(AuthProvider.Google);
          }}
        >
          <IconGoogle className="mr-3 h-5 w-5" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default SignContent;
