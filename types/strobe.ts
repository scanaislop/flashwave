import { Animated } from 'react-native';
import { ComponentType } from 'react';
import { Sparkles, Zap } from 'lucide-react-native';

// Core strobe color interface
export interface StrobeColor {
    name: string;
    color: string;
    secondary: string;
}

// Strobe effect types
export interface StrobeEffect {
    id: string;
    name: string;
    icon: ComponentType<{ size?: number; color?: string }>;
}

// Strobe settings interface
export interface StrobeSettings {
    isStrobing: boolean;
    strobeSpeed: number;
    selectedColor: number;
    selectedEffect: number;
    sustainedMode: boolean;
    flashlightEnabled: boolean;
    screenBrightness: number;
}

// Animation refs interface
export interface StrobeAnimations {
    flashAnimation: Animated.Value;
    sustainedAnimation: Animated.Value;
    waveAnimation: Animated.Value;
    burstAnimation: Animated.Value;
    controlsOpacity: Animated.Value;
    toggleIconOpacity: Animated.Value;
    colorCycleAnimation: Animated.Value;
}

// Intervals and timeouts interface
export interface StrobeIntervals {
    strobeInterval: React.RefObject<NodeJS.Timeout | null>;
    flashlightInterval: React.RefObject<NodeJS.Timeout | null>;
    hideControlsTimeout: React.RefObject<NodeJS.Timeout | null>;
    colorCycleLoop: React.RefObject<Animated.CompositeAnimation | null>;
}

// Hardware state interface
export interface HardwareState {
    torchAvailable: boolean;
    originalBrightness: number;
    currentBrightness: number;
}

// Complete strobe state interface
export interface StrobeState {
    settings: StrobeSettings;
    hardware: HardwareState;
    ui: {
        showControls: boolean;
        isInitialized: boolean;
    };
    animations: StrobeAnimations;
    intervals: StrobeIntervals;
}

// Component prop interfaces
export interface HeaderProps {
    handleBack: () => void;
    handleToggleControls: () => void;
}

export interface CenterControlsProps {
    isStrobing: boolean;
    currentColor: StrobeColor;
    toggleStrobe: () => void;
}

export interface HardwareControlsProps {
    flashlightEnabled: boolean;
    screenBrightness: number;
    currentColor: StrobeColor;
    torchAvailable: boolean;
    toggleFlashlight: () => void;
    handleBrightnessChange: (value: number) => void;
}

export interface SpeedControlProps {
    strobeSpeed: number;
    currentColor: StrobeColor;
    setStrobeSpeed: (value: number) => void;
}

export interface EffectSelectionProps {
    selectedEffect: number;
    currentColor: StrobeColor;
    setSelectedEffect: (value: number) => void;
}

export interface SustainedModeToggleProps {
    sustainedMode: boolean;
    currentColor: StrobeColor;
    setSustainedMode: (value: boolean) => void;
}

export interface ColorSelectionProps {
    selectedColor: number;
    setSelectedColor: (value: number) => void;
    strobeColors: StrobeColor[];
}

export interface StrobeEffectsProps {
    currentColor: StrobeColor;
    waveAnimation: Animated.Value;
    burstAnimation: Animated.Value;
    flashAnimation: Animated.Value;
    sustainedAnimation: Animated.Value;
    sustainedMode: boolean;
}

export interface ToggleControlsIconProps {
    toggleIconOpacity: Animated.Value;
    currentColor: StrobeColor;
    handleToggleControls: () => void;
}

// Hook interfaces
export interface UseStrobeLogicProps {
    settings: StrobeSettings;
    animations: StrobeAnimations;
    intervals: StrobeIntervals;
    setCurrentColorIndex: (value: number) => void;
}

export interface UseHardwareManagerProps {
    setTorchAvailable: (value: boolean) => void;
    setOriginalBrightness: (value: number) => void;
    setScreenBrightness: (value: number) => void;
}

export interface UseSettingsPersistenceProps {
    settings: StrobeSettings;
    isInitialized: boolean;
}

// Error types
export interface StrobeError {
    type: 'hardware' | 'animation' | 'settings' | 'unknown';
    message: string;
    code?: string;
}

// Constants
export const STROBE_EFFECTS: StrobeEffect[] = [
    { id: 'pulse', name: 'Pulse', icon: Zap },
    { id: 'wave', name: 'Wave', icon: Sparkles },
    { id: 'burst', name: 'Burst', icon: Sparkles },
    { id: 'fade', name: 'Fade', icon: Sparkles },
];

export const STROBE_COLORS: StrobeColor[] = [
    { name: 'Electric', color: '#06FFA5', secondary: '#00E5FF' },
    { name: 'Fire', color: '#FF6B35', secondary: '#FFD23F' },
    { name: 'Purple', color: '#8B5CF6', secondary: '#C084FC' },
    { name: 'Blue', color: '#3B82F6', secondary: '#06B6D4' },
    { name: 'White', color: '#FFFFFF', secondary: '#E5E7EB' },
    { name: 'Red', color: '#EF4444', secondary: '#F97316' },
    { name: 'Rainbow', color: '#FF0080', secondary: '#00FF80' },
    { name: 'Orange', color: '#F59E0B', secondary: '#F59E0B' },
    { name: 'Green', color: '#6bff00', secondary: '#6bff00' },
    { name: 'Red', color: '#ff0000', secondary: '#ff0000' },
];

export const STORAGE_KEY = '@flashwave_strobe_settings';
