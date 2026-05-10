"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PengaturanPage() {
  const [settings, setSettings] = useState({
    emailNotif: true,
    browserNotif: false,
    autoBackup: true,
    theme: 'light',
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="dashboard-content" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--neutral-900)' }}>Pengaturan Sistem</h1>
        <p style={{ color: 'var(--neutral-500)', fontSize: '14px' }}>Konfigurasi notifikasi, tampilan, dan pencadangan data aplikasi Anda.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '12px' }}>Notifikasi</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--neutral-800)' }}>Notifikasi Email</div>
              <div style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>Terima email peringatan H-30 dokumen kerja sama habis masa berlakunya.</div>
            </div>
            <button 
              onClick={() => handleToggle('emailNotif')}
              style={{ width: '44px', height: '24px', borderRadius: '12px', background: settings.emailNotif ? 'var(--primary-600)' : 'var(--neutral-300)', position: 'relative', border: 'none', cursor: 'pointer', transition: '0.2s' }}
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: settings.emailNotif ? '22px' : '2px', transition: '0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--neutral-800)' }}>Notifikasi Browser (Push)</div>
              <div style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>Tampilkan notifikasi pop-up di desktop saat ada penambahan data baru.</div>
            </div>
            <button 
              onClick={() => handleToggle('browserNotif')}
              style={{ width: '44px', height: '24px', borderRadius: '12px', background: settings.browserNotif ? 'var(--primary-600)' : 'var(--neutral-300)', position: 'relative', border: 'none', cursor: 'pointer', transition: '0.2s' }}
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: settings.browserNotif ? '22px' : '2px', transition: '0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700, color: 'var(--neutral-900)', borderBottom: '1px solid var(--neutral-200)', paddingBottom: '12px' }}>Pencadangan Data</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--neutral-800)' }}>Auto-Backup Harian</div>
            <div style={{ fontSize: '13px', color: 'var(--neutral-500)' }}>Simpan salinan data otomatis setiap jam 00:00 ke server pusat.</div>
          </div>
          <button 
            onClick={() => handleToggle('autoBackup')}
            style={{ width: '44px', height: '24px', borderRadius: '12px', background: settings.autoBackup ? 'var(--primary-600)' : 'var(--neutral-300)', position: 'relative', border: 'none', cursor: 'pointer', transition: '0.2s' }}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: settings.autoBackup ? '22px' : '2px', transition: '0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </button>
        </div>
        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--primary-50)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <span style={{ fontSize: '14px', color: 'var(--primary-800)', fontWeight: 500 }}>Backup terakhir: Hari ini, 00:05 WIB</span>
           <button onClick={() => toast.success('Berhasil melakukan backup manual!')} style={{ background: '#fff', border: '1px solid var(--primary-200)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--primary-700)', cursor: 'pointer' }}>Backup Sekarang</button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSave} style={{ background: 'var(--primary-600)', color: '#fff', padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          Simpan Pengaturan
        </button>
      </div>

    </div>
  );
}
