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
    <div
      className="login-container p-5 rounded-3 d-flex flex-column"
      style={{ backgroundColor: "white" }}
    >
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <h1 className="h3 mb-3 fw-normal">Sign up</h1>
        <div className="form-floating">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="form-control"
            required
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          className="w-100 py-2 mt-3 rounded-2 text-white"
          style={{
            background: "linear-gradient(-35deg, #00ccdd, #4f75ff, #6439ff)",
          }}
        >
          Register
        </button>
      </form>
      <p>
        Already registered? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}
