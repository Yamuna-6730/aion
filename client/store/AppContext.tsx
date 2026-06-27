'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Company, Mission, mockCompanies, mockMissions } from '../constants/mockData';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeMission: Mission | null;
  setActiveMission: (mission: Mission | null) => void;
  missions: Mission[];
  startMission: (query: string) => void;
  compareList: string[];
  toggleCompare: (companyId: string) => void;
  clearCompare: () => void;
  notifications: { id: string; message: string; timestamp: string; read: boolean; type: string }[];
  addNotification: (message: string, type?: string) => void;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  companies: Company[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [missions, setMissions] = useState<Mission[]>(mockMissions);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [companies] = useState<Company[]>(mockCompanies);
  const [notifications, setNotifications] = useState<{ id: string; message: string; timestamp: string; read: boolean; type: string }[]>([]);

  // On mount, check if there's a theme preference or default to dark
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addNotification = (message: string, type = 'info') => {
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const startMission = (query: string) => {
    // Generate a new running mission
    const newMissionId = `mission-${Date.now()}`;
    const newMission: Mission = {
      id: newMissionId,
      name: query.length > 30 ? `${query.slice(0, 30)}...` : query,
      status: 'Running',
      query,
      timestamp: new Date().toISOString(),
      plannerState: 'Thinking',
      agentsActive: 7,
      companiesFound: 0,
      elapsedTime: '00:00',
      confidence: 10,
      activityLog: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), message: "Planner Initialized", type: 'info' }
      ],
      consoleStream: [
        "Planner: Initializing query routing...",
        "Planner: Analyzing natural language constraints..."
      ]
    };

    setMissions((prev) => [newMission, ...prev]);
    setActiveMission(newMission);
    addNotification(`Started Mission: "${newMission.name}"`, 'success');
  };

  const toggleCompare = (companyId: string) => {
    setCompareList((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      }
      if (prev.length >= 3) {
        addNotification("You can compare a maximum of 3 companies side-by-side.", "warning");
        return prev;
      }
      return [...prev, companyId];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeMission,
        setActiveMission,
        missions,
        startMission,
        compareList,
        toggleCompare,
        clearCompare,
        notifications,
        addNotification,
        isCommandOpen,
        setIsCommandOpen,
        companies
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
