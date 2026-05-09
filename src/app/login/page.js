"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import '../../../public/styles/login.css';

export default function Login() {
  const router = useRouter();
  const { data } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

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
      // In a real app, validate against the accounts list or API.
      if (username === 'admin' && (password === 'admin' || password === 'admin123')) {
        document.cookie = "auth_token=admin-token-123; path=/; max-age=86400";
        localStorage.setItem('kinerjaku_loggedIn', 'true');
        localStorage.setItem('kinerjaku_user', JSON.stringify({
          username: 'admin',
          role: 'Admin Pusat',
          fullName: 'Biro Perencanaan',
          avatar: 'BP'
        }));
        router.push('/dashboard');
      } else {
        setError('Username atau password salah. (Gunakan: admin / admin123)');
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
            <img src="/logo-kkp.png" alt="Logo KKP" style={{ width: '150px', height: 'auto', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
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
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <span>{showPassword ? '🔒' : '👁️'}</span>
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
              <span>{isLoading ? 'Memproses...' : '➔ Masuk'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
