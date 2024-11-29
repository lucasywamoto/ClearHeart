"use client";

import { signIn, signOut } from "next-auth/react";

const getCallbackUrl = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = isProduction
    ? "https://clearheart.onrender.com"
    : window.location.origin;
  return `${baseUrl}/dashboard`;
};

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, {
    callbackUrl: getCallbackUrl(),
  });
}

export async function doLogin(formData) {
  const loginData = Object.fromEntries(formData);
  await signIn("credentials", {
    ...loginData,
    callbackUrl: getCallbackUrl(),
  });
}

export async function doLogout() {
  await signOut({
    callbackUrl: "/login",
  });
}
