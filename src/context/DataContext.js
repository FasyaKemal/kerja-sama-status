"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import MockDataRaw from '@/lib/data';

const DataContext = createContext();

const STORAGE_KEYS = {
  databaseKerjaSama: 'db_kerja_sama_persistent',
  kebijakanPrioritas: 'kp_prioritas_persistent',
  progressDokumen: 'progress_dokumen_persistent',
};

export function DataProvider({ children }) {
  const [data, setData] = useState({
    databaseKerjaSama: [],
    kebijakanPrioritas: [],
    progressDokumen: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from local storage
    const loadFromStorage = (key, fallback) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return fallback;
        }
      }
      return fallback;
    };

    const hydrate = () => {
      setData({
        databaseKerjaSama: loadFromStorage(STORAGE_KEYS.databaseKerjaSama, MockDataRaw.databaseKerjaSama || []),
        kebijakanPrioritas: loadFromStorage(STORAGE_KEYS.kebijakanPrioritas, MockDataRaw.kebijakanPrioritas || []),
        progressDokumen: loadFromStorage(STORAGE_KEYS.progressDokumen, MockDataRaw.progressDokumen || [])
      });
    };

    hydrate();

    // Keep state in sync if data changes in another tab or via custom events.
    const onStorage = (e) => {
      if (!e || !e.key) return;
      if (Object.values(STORAGE_KEYS).includes(e.key)) hydrate();
    };
    const onCustom = (e) => {
      const key = e?.detail?.key;
      if (key && Object.values(STORAGE_KEYS).includes(key)) hydrate();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('kinerjaku:data-updated', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('kinerjaku:data-updated', onCustom);
    };

    setIsLoading(false);
  }, []);

  const emitDataUpdated = (key) => {
    try {
      window.dispatchEvent(new CustomEvent('kinerjaku:data-updated', { detail: { key } }));
    } catch (e) { }
  };

  const updateDatabase = (newDatabase) => {
    setData(prev => ({ ...prev, databaseKerjaSama: newDatabase }));
    localStorage.setItem(STORAGE_KEYS.databaseKerjaSama, JSON.stringify(newDatabase));
    MockDataRaw.databaseKerjaSama = newDatabase;
    emitDataUpdated(STORAGE_KEYS.databaseKerjaSama);
  };

  const updateKebijakan = (newKebijakan) => {
    setData(prev => ({ ...prev, kebijakanPrioritas: newKebijakan }));
    localStorage.setItem(STORAGE_KEYS.kebijakanPrioritas, JSON.stringify(newKebijakan));
    MockDataRaw.kebijakanPrioritas = newKebijakan;
    emitDataUpdated(STORAGE_KEYS.kebijakanPrioritas);
  };

  const updateProgress = (newProgress) => {
    setData(prev => ({ ...prev, progressDokumen: newProgress }));
    localStorage.setItem(STORAGE_KEYS.progressDokumen, JSON.stringify(newProgress));
    MockDataRaw.progressDokumen = newProgress;
    emitDataUpdated(STORAGE_KEYS.progressDokumen);
  };

  return (
    <DataContext.Provider value={{ data, isLoading, updateDatabase, updateKebijakan, updateProgress }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
