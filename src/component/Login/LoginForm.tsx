"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/features/auth/authaction";

export default function LoginForm() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginData = {
      email,
      password,
      deviceId: "web",
      deviceModel: navigator.userAgent,
      platform: "WEB",
      fcmToken: "",
      appType: "MANAGEMENT_APP",
    };

    try {
      await dispatch(loginUser(loginData));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0d0d0d;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,140,60,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(180,140,60,0.06) 0%, transparent 60%);
          font-family: 'DM Sans', sans-serif;
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #111111;
          border: 1px solid rgba(180,140,60,0.2);
          border-radius: 2px;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.6s ease both;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,140,60,0.7), transparent);
        }

        .login-card::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,140,60,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(180,140,60,0.8);
          margin-bottom: 0.5rem;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 300;
          color: #f0ead6;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s 0.15s ease both;
        }

        .login-title span {
          color: rgba(180,140,60,0.9);
          font-style: italic;
        }

        .field-group {
          margin-bottom: 1.5rem;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .field-group:nth-child(2) {
          animation-delay: 0.25s;
        }

        .field-label {
          display: block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,234,214,0.45);
          margin-bottom: 0.6rem;
          transition: color 0.2s;
        }

        .field-label.active {
          color: rgba(180,140,60,0.8);
        }

        .field-wrapper {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          padding: 0.875rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #f0ead6;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(240,234,214,0.2);
        }

        .field-input:focus {
          border-color: rgba(180,140,60,0.5);
          background: rgba(180,140,60,0.04);
          box-shadow: 0 0 0 3px rgba(180,140,60,0.07);
        }

        .field-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px;
          width: 0%;
          background: linear-gradient(90deg, rgba(180,140,60,0.9), rgba(180,140,60,0.3));
          transition: width 0.35s ease;
          border-radius: 0 0 2px 2px;
        }

        .field-input:focus ~ .field-line {
          width: 100%;
        }

        .login-btn {
          width: 100%;
          margin-top: 2rem;
          padding: 1rem;
          background: linear-gradient(135deg, #b48c3c 0%, #c9a84c 50%, #b48c3c 100%);
          background-size: 200% 200%;
          border: none;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1a1200;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.15s, background-position 0.4s;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.6s 0.35s ease both;
        }

        .login-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(180,140,60,0.25);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .login-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(26,18,0,0.3);
          border-top-color: #1a1200;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        .login-footer p {
          font-size: 12px;
          color: rgba(240,234,214,0.3);
          letter-spacing: 0.03em;
        }

        .login-footer a {
          color: rgba(180,140,60,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }

        .login-footer a:hover {
          color: rgba(180,140,60,1);
        }

        .corner-accent {
          position: absolute;
          bottom: 0; right: 0;
          width: 60px; height: 60px;
          border-right: 1px solid rgba(180,140,60,0.15);
          border-bottom: 1px solid rgba(180,140,60,0.15);
          border-radius: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          <div className="corner-accent" />

          <p className="login-eyebrow">Management Portal</p>
          <h1 className="login-title">
            Welcome <span>back</span>
          </h1>

          <form onSubmit={handleLogin}>
            <div className="field-group">
              <label
                className={`field-label ${focusedField === "email" ? "active" : ""}`}
              >
                Email address
              </label>
              <div className="field-wrapper">
                <input
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  required
                />
                <div className="field-line" />
              </div>
            </div>

            <div className="field-group">
              <label
                className={`field-label ${focusedField === "password" ? "active" : ""}`}
              >
                Password
              </label>
              <div className="field-wrapper">
                <input
                  type="password"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                />
                <div className="field-line" />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              <span className="login-btn-inner">
                {loading && <span className="spinner" />}
                {loading ? "Authenticating" : "Sign in"}
              </span>
            </button>
          </form>

          <div className="login-footer">
            <p>
              Forgot your password?{" "}
              <a href="#">Reset it here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}