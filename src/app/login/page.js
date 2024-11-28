"use client";
import { doSocialLogin, doLogin } from "../action";

export default function Login() {
  return (
    <>
      <form
        action={doLogin}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        ></button>
      </form>
      <form action={doSocialLogin}>
        <button type="submit" name="action" value="google">
          Login with Google
        </button>
        <button type="submit" name="action" value="github">
          Login with GitHub
        </button>
      </form>
    </>
  );
}
