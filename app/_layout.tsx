import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { hasAcceptedCurrentDisclaimer } from '@/utils/storage';
import { useFonts } from 'expo-font';
import { TabBarProvider } from '@/context/TabBarContext';
import {
  Orbitron_400Regular,
  Orbitron_700Bold,
  Orbitron_900Black,
} from '@expo-google-fonts/orbitron';
import {
  Rajdhani_400Regular,
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Orbitron-Regular': Orbitron_400Regular,
    'Orbitron-Bold': Orbitron_700Bold,
    'Orbitron-Black': Orbitron_900Black,
    'Rajdhani-Regular': Rajdhani_400Regular,
    'Rajdhani-Medium': Rajdhani_500Medium,
    'Rajdhani-SemiBold': Rajdhani_600SemiBold,
    'Rajdhani-Bold': Rajdhani_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Check if user has accepted the current disclaimer version
  useEffect(() => {
    const checkDisclaimer = async () => {
      try {
        const hasAccepted = await hasAcceptedCurrentDisclaimer();
        setDisclaimerChecked(true);
        
        // If user hasn't accepted current disclaimer version
        if (!hasAccepted) {
          // We'll redirect to disclaimer and return to tabs after acceptance
          router.replace({
            pathname: '/disclaimer',
            params: { returnTo: '/(tabs)' }
          });
        }
      } catch (error) {
        console.error('Error checking disclaimer:', error);
        setDisclaimerChecked(true);
      }
    };
    
    checkDisclaimer();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TabBarProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="disclaimer" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </TabBarProvider>
  );
}