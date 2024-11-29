"use client";

import { signIn, signOut } from "next-auth/react";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, {
    callbackUrl: "/dashboard",
  });
}

export async function doLogin(formData) {
  const loginData = Object.fromEntries(formData);
  await signIn("credentials", {
    ...loginData,
    callbackUrl: "/dashboard",
  });
}

export async function doLogout() {
  await signOut({
    callbackUrl: "/login",
  });
}
