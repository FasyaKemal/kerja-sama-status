"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProfilPage() {
  const [user, setUser] = useState({
    username: '',
    fullName: '',
    role: '',
    email: 'admin.pusat@kkp.go.id',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('kinerjaku_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Gagal memuat profil pengguna");
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      avatar: user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'A'
    };
    
    localStorage.setItem('kinerjaku_user', JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('profileUpdated'));
    
    setIsEditing(false);
    toast.success('Profil berhasil diperbarui!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Semua kolom password wajib diisi.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Konfirmasi password baru tidak cocok.');
      return;
    }

    // Simulate verification
    if (passwordData.oldPassword !== 'admin' && passwordData.oldPassword !== 'admin123') {
      toast.error('Password lama salah.');
      return;
    }

    toast.success('Password berhasil diperbarui!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="dashboard-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>Profil Saya</h1>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px' }}>Kelola informasi data diri dan keamanan akun Anda.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--neutral-200)', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700 }}>
            {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'A'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 700, color: 'var(--neutral-900)' }}>{user.fullName || 'Administrator'}</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>@{user.username || 'admin'}</span>
              <span style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{user.role || 'Super Admin'}</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              style={{ background: isEditing ? 'var(--neutral-100)' : 'var(--primary-600)', color: isEditing ? 'var(--neutral-700)' : '#fff', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
            >
              {isEditing ? 'Batal Edit' : 'Edit Profil'}
            </button>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Nama Lengkap</label>
                <input 
                  type="text" 
                  value={user.fullName} 
                  onChange={e => setUser({...user, fullName: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px', backgroundColor: isEditing ? '#fff' : 'var(--neutral-50)' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Username</label>
                <input 
                  type="text" 
                  value={user.username} 
                  onChange={e => setUser({...user, username: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px', backgroundColor: isEditing ? '#fff' : 'var(--neutral-50)' }}
                  required
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Email Instansi</label>
                <input 
                  type="email" 
                  value={user.email} 
                  onChange={e => setUser({...user, email: e.target.value})}
                  disabled={!isEditing}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px', backgroundColor: isEditing ? '#fff' : 'var(--neutral-50)' }}
                />
              </div>
            </div>
            
            {isEditing && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" style={{ background: 'var(--primary-600)', color: '#fff', padding: '10px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: 'var(--neutral-900)' }}>Keamanan Akun</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--neutral-500)' }}>Ganti password Anda secara berkala untuk menjaga keamanan data kerja sama KKP.</p>
        
        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Password Lama</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={passwordData.oldPassword}
                onChange={e => setPasswordData({...passwordData, oldPassword: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Password Baru</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={passwordData.newPassword}
                onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--neutral-700)' }}>Konfirmasi Password Baru</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--neutral-300)', borderRadius: '8px', fontSize: '14px' }} 
                required 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ background: 'var(--neutral-800)', color: '#fff', padding: '10px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
