import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlowButton from '@/components/shared/GlowButton';
import AnimatedWave from '@/components/shared/AnimatedWave';
import { SkipForward } from 'lucide-react-native';
import { onboardingData } from '@/constants/data';
import { onboardingStyles } from '@/components/styles/onboarding';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex); 
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width, animated: true
      });
    } else {
      router.replace('/disclaimer');
    }
  };

  const handleSkip = () => {
    router.replace('/disclaimer');
  };

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setCurrentIndex(index);
  };

  const renderOnboardingItem = (item: typeof onboardingData[0], index: number) => {
    return (<View key={item.id} style={onboardingStyles.slideContainer}>
      <View style={onboardingStyles.iconContainer}>
        <LinearGradient
          colors={[item.color, `${item.color}80`]}
          style={onboardingStyles.iconGradient}>
          <item.icon size={80} color="#FFFFFF" />
        </LinearGradient>
        <AnimatedWave color={item.color} intensity={0.8} />
      </View>

      <View style={onboardingStyles.textContainer}>
        <Text style={onboardingStyles.title}>{item.title}</Text>
        <Text style={onboardingStyles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>);
  };

  return (<LinearGradient colors={colors.backgroundGradient} style={onboardingStyles.container}>
    <SafeAreaView style={onboardingStyles.safeArea}>
      <View style={onboardingStyles.header}>
        <TouchableOpacity onPress={handleSkip} style={onboardingStyles.skipButton}>
          <SkipForward size={20} color="#64748B" />
          <Text style={onboardingStyles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={onboardingStyles.scrollView}>
        {onboardingData.map((item, index) => renderOnboardingItem(item, index))}
      </ScrollView>

      <View style={onboardingStyles.footer}>
        <View style={onboardingStyles.pagination}>
          {onboardingData.map((_, index) => (<View
            key={index}
            style={[onboardingStyles.dot, currentIndex === index && onboardingStyles.activeDot]}
          />))}
        </View>

        <GlowButton
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="large"
          style={onboardingStyles.nextButton}
        />
      </View>
    </SafeAreaView>
  </LinearGradient>);
}
