import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { TabBarProvider } from '@/context/TabBarContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { hasAcceptedCurrentDisclaimer } from '@/utils/storage';
import { fontMap } from '@/constants/fonts';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [fontsLoaded, fontError] = useFonts(fontMap);

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
        
        // If user hasn't accepted current disclaimer version
        if (!hasAccepted) {
          // We'll redirect to disclaimer and return to tabs after acceptance
          router.replace({
            pathname: '/disclaimer',
            params: { returnTo: '/(tabs)' },
          } as never);
        }
      } catch (error) {
        console.error('Error checking disclaimer:', error);
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
