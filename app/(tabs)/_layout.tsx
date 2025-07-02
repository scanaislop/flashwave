import { Tabs } from 'expo-router';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { House, Mic, Palette, Settings, Users, Zap } from 'lucide-react-native';
import { useTabBar } from '@/context/TabBarContext';
import { useEffect, useRef } from 'react';

export default function TabLayout() {
  const { isTabBarVisible } = useTabBar();
  const tabBarOpacity = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Animate tab bar opacity when visibility changes
    Animated.timing(tabBarOpacity, {
      toValue: isTabBarVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [isTabBarVisible, tabBarOpacity]);
  
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: isTabBarVisible ? {
            backgroundColor: '#0A0A0F',
            borderTopWidth: 1,
            borderTopColor: '#8B5CF6',
            height: Platform.OS === 'ios' ? 85 : 65,
            paddingBottom: Platform.OS === 'ios' ? 35 : 20,
            paddingTop: 10,
            opacity: tabBarOpacity,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          } : { display: 'none' },
      tabBarActiveTintColor: '#06FFA5', 
      tabBarInactiveTintColor: '#64748B', 
      tabBarLabelStyle: {
        fontSize: 12, fontFamily: 'Rajdhani-Medium'
      }
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home', tabBarIcon: ({ size, color }) => (<House size={size} color={color} />)
      }}
    />
    <Tabs.Screen
      name="sound-reactive"
      options={{
        title: 'Sound', tabBarIcon: ({ size, color }) => (<Mic size={size} color={color} />)
      }}
    />
    <Tabs.Screen
      name="manual-strobe"
      options={{
        title: 'Strobe', tabBarIcon: ({ size, color }) => (<Zap size={size} color={color} />)
      }}
    />
    <Tabs.Screen
      name="party-sync"
      options={{
        title: 'Sync', tabBarIcon: ({ size, color }) => (<Users size={size} color={color} />)
      }}
    />
    <Tabs.Screen
      name="visual-effects"
      options={{
        title: 'Effects', tabBarIcon: ({ size, color }) => (<Palette size={size} color={color} />)
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Settings', tabBarIcon: ({ size, color }) => (<Settings size={size} color={color} />)
      }}
    />
  </Tabs>
    </View>
  );
}
