"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Sign-in is a visual demo only. No account was checked and no session was created.");
  }

  return <main className="login-page">
    <section className="login-brand-panel">
      <Link href="/" className="login-wordmark" aria-label="Rentos home"><span className="login-brand-mark">R</span><span>rentos<small>EVENT OPERATIONS</small></span></Link>
      <div className="login-quote">
        <span className="login-quote-mark">“</span>
        <h1>Great events don’t just happen.<br /><em>They come together.</em></h1>
        <p>One lovely little detail at a time.</p>
      </div>
      <div className="login-art" aria-hidden="true">
        <div className="login-art-sun" />
        <div className="login-art-arch" />
        <div className="login-art-table"><i /><b /></div>
        <div className="login-art-chair chair-a"><i /><b /></div>
        <div className="login-art-chair chair-b"><i /><b /></div>
        <div className="login-art-leaves"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="login-panel-footer"><span>RENTOS EVENTS & RENTALS</span><span>LAGOS, NIGERIA · WAT (UTC+1)</span></div>
    </section>
    <section className="login-form-panel">
      <div className="login-topline"><span className="login-demo-label"><i /> DEMO WORKSPACE</span><Link href="/overview">Back to workspace <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
      <div className="login-card">
        <div className="login-welcome-icon"><Sparkles size={19} aria-hidden="true" /></div>
        <div className="login-eyebrow">YOUR EVENT WORKSPACE</div>
        <h2>Welcome<br />back.</h2>
        <p className="login-description">Sign in to keep all the lovely details in one place.</p>
        <div className="login-demo-note"><b>Demo sign-in</b><span>This form is for display only. Authentication is not connected.</span></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" type="email" autoComplete="username" required placeholder="you@yourbusiness.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <div className="login-password-label"><label htmlFor="login-password">Password</label><button type="button" onClick={() => setMessage("Password reset is unavailable in this visual demo.")}>Forgot password?</button></div>
          <div className="login-password-input"><input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((shown) => !shown)}>{showPassword ? "Hide" : "Show"}</button></div>
          <label className="remember-option"><input type="checkbox" /> <span>Keep me signed in</span></label>
          <button className="login-submit" type="submit">Sign in to Rentos <ArrowUpRight size={15} aria-hidden="true" /></button>
        </form>
        {message && <p className="login-message" role="status">{message}</p>}
        <p className="login-help">Need a hand? Talk to your workspace admin.</p>
      </div>
      <footer className="login-legal"><span>© 2026 Rentos Events</span><span>Private workspace · Demo environment</span></footer>
    </section>
  </main>;
}
