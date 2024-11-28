"use client";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      response.status == 201 && router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" type="text" required />
      </label>
      <label>
        Email:
        <input name="email" type="email" required />
      </label>
      <label>
        Password:
        <input name="password" type="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
