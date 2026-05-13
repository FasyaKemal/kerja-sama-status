"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import '../../../public/styles/login.css';

export default function Login() {
  const router = useRouter();
  const { data } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  // Avoid hydration mismatch: random numbers must be generated only on client after mount.
  const [{ num1, num2 }, setCaptchaNums] = useState({ num1: 0, num2: 0 });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCaptchaNums({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
    });
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !password || !captchaAnswer) {
      setError('Semua kolom wajib diisi.');
      setIsLoading(false);
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setError('Jawaban captcha salah.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Demo auth: persisted in localStorage so changes from Profil page take effect.
      const authKey = 'kinerjaku_auth';
      const defaultAuth = { username: 'admin', password: 'admin123' };

      let storedAuth = defaultAuth;
      try {
        const raw = localStorage.getItem(authKey);
        if (raw) storedAuth = { ...defaultAuth, ...JSON.parse(raw) };
        else localStorage.setItem(authKey, JSON.stringify(defaultAuth));
      } catch (e) {
        storedAuth = defaultAuth;
        try { localStorage.setItem(authKey, JSON.stringify(defaultAuth)); } catch (e2) {}
      }

      if (username === storedAuth.username && password === storedAuth.password) {
        document.cookie = "auth_token=admin-token-123; path=/; max-age=86400";
        localStorage.setItem('kinerjaku_loggedIn', 'true');
        // Keep existing profile fields (fullName/role/email) if present.
        const defaultUser = {
          username: storedAuth.username,
          role: 'Admin Pusat',
          fullName: 'Biro Perencanaan',
          avatar: 'BP',
        };
        let nextUser = defaultUser;
        try {
          const existingRaw = localStorage.getItem('kinerjaku_user');
          if (existingRaw) {
            const existing = JSON.parse(existingRaw);
            nextUser = { ...defaultUser, ...existing, username: storedAuth.username };
          }
        } catch (e) {}
        localStorage.setItem('kinerjaku_user', JSON.stringify(nextUser));
        router.push('/dashboard');
      } else {
        setError('Username atau password salah.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-container">
      {/* Left Side: Branding */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="kkp-logo-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <Image src="/logo-kkp.png" alt="Logo KKP" width={150} height={150} style={{ height: 'auto', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} priority />
          </div>
          <h1 className="branding-title">Biro Perencanaan</h1>
          <h2 className="branding-subtitle">Kementerian Kelautan dan Perikanan</h2>
          <p className="branding-tagline">Sistem Monitoring Database<br/>Kerja Sama </p>
        </div>
        <div className="login-left-footer">
          © 2026 Database Kerja Sama - Kementerian Kelautan dan Perikanan
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="login-right">
        <div className="login-card-v2">
          <h2 className="card-title">Selamat Datang</h2>
          <p className="card-subtitle">Masukan username dan password Anda untuk mengakses sistem.</p>

          <div className={`login-error-v2 ${error ? 'show' : ''}`} id="login-error">
             <span id="login-error-text">{error}</span>
          </div>

          <form className="login-form-v2" onSubmit={handleLogin}>
            <div className="form-group-v2">
              <label className="label-v2">Username</label>
              <input className="input-v2" type="text" placeholder="Masukan username anda" required value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            
            <div className="form-group-v2">
              <label className="label-v2">Password</label>
              <div className="password-wrapper">
                <input className="input-v2" type={showPassword ? "text" : "password"} placeholder="Masukan password anda" required value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            {num1 > 0 && (
              <div className="form-group-v2">
                <label className="label-v2">Berapa hasil dari: {num1} + {num2} = ?</label>
                <input className="input-v2" type="number" placeholder="Masukkan jawaban" required value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} />
              </div>
            )}

            <button type="submit" className="btn-login-v2" disabled={isLoading}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isLoading ? 'Memproses...' : (
                  <>
                    Masuk
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
