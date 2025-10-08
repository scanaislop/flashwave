import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import AnimatedWave from '@/components/shared/AnimatedWave';
import { modes } from '@/types/modes';
import { homeStyles } from '@/components/styles/home';

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lastUsedMode, setLastUsedMode] = useState('sound-reactive');

  const handleModePress = (route: string, modeId: string) => {
    setLastUsedMode(modeId);
    router.push(route as any);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStartLightshow = () => {
    const lastMode = modes.find(mode => mode.id === lastUsedMode);
    if (lastMode) {
      // router.push(lastMode.route);
    }
  };

  return (<LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={homeStyles.container}>
    <SafeAreaView style={homeStyles.safeArea} edges={['right', 'left', 'top']}>
      <View style={homeStyles.header}>
        <View>
          <Text style={homeStyles.appTitle}>FLASHWAVE</Text>
          <Text style={homeStyles.tagline}>Party Light Controller</Text>
        </View>
      </View>

      <ScrollView style={homeStyles.content} showsVerticalScrollIndicator={false}>
        <View style={homeStyles.heroSection}>
          <AnimatedWave color="#06FFA5" intensity={1.2} />
          <Text style={homeStyles.subtitle}>Choose your mode and let the lights dance</Text>

          <GlowButton
            title="Start Lightshow"
            onPress={handleStartLightshow}
            size="large"
            style={homeStyles.primaryButton}
          />
        </View>

        <View style={homeStyles.modesSection}>
          <Text style={homeStyles.sectionTitle}>Available Modes</Text>

          <View style={homeStyles.modesGrid}>
            {modes.map((mode) => (<TouchableOpacity
              key={mode.id}
              onPress={() => handleModePress(mode.route, mode.id)}
              activeOpacity={0.8}
              style={homeStyles.modeCardWrapper}>
              <NeonContainer
                glowColor={mode.color}
                variant={lastUsedMode === mode.id ? 'strong' : 'medium'}
                style={[homeStyles.modeCard, lastUsedMode === mode.id && homeStyles.activeModeCard]}>
                <View style={homeStyles.modeHeader}>
                  <LinearGradient
                    colors={[mode.color, `${mode.color}80`]}
                    style={homeStyles.modeIcon}>
                    <mode.icon size={28} color="#FFFFFF" />
                  </LinearGradient>
                  {lastUsedMode === mode.id && (<View style={homeStyles.activeIndicator}>
                    <Text style={homeStyles.activeText}>LAST</Text>
                  </View>)}
                </View>
                <Text style={homeStyles.modeTitle}>{mode.title}</Text>
                <Text style={homeStyles.modeSubtitle}>{mode.subtitle}</Text>
              </NeonContainer>
            </TouchableOpacity>))}
          </View>
        </View>

        <NeonContainer style={homeStyles.infoCard}>
          <Text style={homeStyles.infoTitle}>Party Ready</Text>
          <Text style={homeStyles.infoText}>
            Connect your phone to speakers for the best experience.
            Use headphones or enable silent mode to prevent audio feedback.
          </Text>
        </NeonContainer>
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>);
}
