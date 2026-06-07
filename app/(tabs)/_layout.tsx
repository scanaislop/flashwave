import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { House, Mic, Settings, Users, Zap, Type } from 'lucide-react-native';
import { fonts } from '@/constants/fonts';
import { useTabBar } from '@/context/TabBarContext';

export default function TabLayout() {
  const { isTabBarVisible } = useTabBar();
  return (<Tabs
    screenOptions={{
      headerShown: false, tabBarStyle: {
        backgroundColor: '#0A0A0F',
        borderTopWidth: 1,
        borderTopColor: '#8B5CF6',
        height: Platform.OS === 'ios' ? 85 : 65,
        paddingBottom: Platform.OS === 'ios' ? 35 : 20,
        paddingTop: 10,
        display: isTabBarVisible ? 'flex' : 'none'
      }, tabBarActiveTintColor: '#06FFA5', tabBarInactiveTintColor: '#64748B', tabBarLabelStyle: {
        fontSize: 12, fontFamily: fonts.medium
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
      name="word"
      options={{
        title: 'Word', tabBarIcon: ({ size, color }) => (<Type size={size} color={color} />)
      }}
    />
    {/* <Tabs.Screen
      name="visual-effects"
      options={{
        title: 'Effects', tabBarIcon: ({ size, color }) => (<Palette size={size} color={color} />)
      }}
    /> */}
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Settings', tabBarIcon: ({ size, color }) => (<Settings size={size} color={color} />)
      }}
    />
  </Tabs>);
}
