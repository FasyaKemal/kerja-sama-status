"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import MockDataRaw from '@/lib/data';

const DataContext = createContext();

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

    // eslint-disable-next-line
    setData({
      databaseKerjaSama: loadFromStorage('db_kerja_sama_persistent', MockDataRaw.databaseKerjaSama || []),
      kebijakanPrioritas: loadFromStorage('kp_prioritas_persistent', MockDataRaw.kebijakanPrioritas || []),
      progressDokumen: loadFromStorage('progress_dokumen_persistent', MockDataRaw.progressDokumen || [])
    });

    setIsLoading(false);
  }, []);

  const updateDatabase = (newDatabase) => {
    setData(prev => ({ ...prev, databaseKerjaSama: newDatabase }));
    localStorage.setItem('db_kerja_sama_persistent', JSON.stringify(newDatabase));
    MockDataRaw.databaseKerjaSama = newDatabase;
  };

  const updateKebijakan = (newKebijakan) => {
    setData(prev => ({ ...prev, kebijakanPrioritas: newKebijakan }));
    localStorage.setItem('kp_prioritas_persistent', JSON.stringify(newKebijakan));
    MockDataRaw.kebijakanPrioritas = newKebijakan;
  };

  const updateProgress = (newProgress) => {
    setData(prev => ({ ...prev, progressDokumen: newProgress }));
    localStorage.setItem('progress_dokumen_persistent', JSON.stringify(newProgress));
    MockDataRaw.progressDokumen = newProgress;
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
