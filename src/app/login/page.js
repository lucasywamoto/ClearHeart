"use client";
import styles from "./page.module.css";
import { doSocialLogin, doLogin } from "../action";
import Image from "next/image";

export default function Login() {
  return (
    <div
      className="login-container p-5 rounded-3"
      style={{ backgroundColor: "white" }}
    >
      <div className="d-flex flex-column align-items-center">
        <Image src="/logo.svg" alt="Logo" width={300} height={80} />
        <span style={{ fontSize: "13px" }}>
          Synchronizing individual feelings with the crowd.
        </span>
        <a className="btn btn-outline-secondary mt-5" href="/register">
          Register
        </a>
      </div>
      <div className="login-divider"></div>
      <div className="login-form">
        <form action={doLogin}>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              name="email"
              className={`form-control ${styles.email}`}
              id="floatingInput"
              placeholder="name@example.com"
            ></input>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className={`form-control ${styles.password}`}
              id="floatingPassword"
              placeholder="Password"
            ></input>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
            Sign in
          </button>
          <hr className={styles.divider}></hr>
        </form>
        <form action={doSocialLogin}>
          <button
            type="submit"
            className={`btn w-100 py-2 ${styles.social}`}
            name="action"
            value="google"
            tabIndex="0"
          >
            Sign in with Google
            <Image
              loading="lazy"
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              width={24}
              height={24}
              className={styles.logo}
            />
          </button>
          <button
            type="submit"
            className={`btn w-100 py-2 mt-3 ${styles.social}`}
            name="action"
            value="github"
            tabIndex="0"
          >
            Sign in with GitHub
            <Image
              loading="lazy"
              src="https://authjs.dev/img/providers/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className={styles.logo}
            />
          </button>
        </form>
        <p className="mt-3 mb-3 text-body-secondary">&copy; 2024</p>
      </div>
    </div>
  );
}
