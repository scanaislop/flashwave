import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabBarContextType {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
}

export const TabBarContext = createContext<TabBarContextType>({
  isTabBarVisible: true,
  setTabBarVisible: () => {},
});

export const useTabBar = () => useContext(TabBarContext);

interface TabBarProviderProps {
  children: ReactNode;
}

export const TabBarProvider: React.FC<TabBarProviderProps> = ({ children }) => {
  const [isTabBarVisible, setTabBarVisible] = useState(true);

  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};
