import { Waves, Zap, Palette, Sparkles, Heart, Star } from 'lucide-react-native';

export const colorPalettes = [
    { name: 'Electric', colors: ['#06FFA5', '#00E5FF', '#7C4DFF'] },
    { name: 'Fire', colors: ['#FF6B35', '#F7931E', '#FFD23F'] },
    { name: 'Ocean', colors: ['#0077BE', '#00A8CC', '#7FDBDA'] },
    { name: 'Purple', colors: ['#8B5CF6', '#A855F7', '#C084FC'] },
    { name: 'Rainbow', colors: ['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#00FF80', '#0080FF', '#8000FF'] },
];

export const lightEffects = [
  {
    id: 'wave-pulse',
    name: 'Wave Pulse',
    description: 'Smooth pulsing waves of light',
    icon: Waves,
    colors: ['#06FFA5', '#00E5FF', '#7C4DFF'],
    preview: '#06FFA5',
  },
  {
    id: 'rainbow-flash',
    name: 'Rainbow Flash',
    description: 'Vibrant rainbow color cycling',
    icon: Palette,
    colors: ['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#00FF80', '#0080FF', '#8000FF'],
    preview: '#FF0080',
  },
  {
    id: 'bass-blast',
    name: 'Bass Blast',
    description: 'Intense flashes on bass drops',
    icon: Zap,
    colors: ['#FF6B35', '#F7931E', '#FFD23F'],
    preview: '#FF6B35',
  },
  {
    id: 'slow-glow',
    name: 'Slow Glow',
    description: 'Gentle breathing light effect',
    icon: Heart,
    colors: ['#8B5CF6', '#A855F7', '#C084FC'],
    preview: '#8B5CF6',
  },
  {
    id: 'sparkle-burst',
    name: 'Sparkle Burst',
    description: 'Random sparkle effects',
    icon: Sparkles,
    colors: ['#FFFFFF', '#06FFA5', '#8B5CF6', '#F59E0B'],
    preview: '#FFFFFF',
  },
  {
    id: 'stellar-dance',
    name: 'Stellar Dance',
    description: 'Cosmic star field animation',
    icon: Star,
    colors: ['#4338CA', '#7C3AED', '#DB2777', '#DC2626'],
    preview: '#4338CA',
  },
];

export const customColors = [
  '#FF0000', '#FF8000', '#FFFF00', '#80FF00',
  '#00FF00', '#00FF80', '#00FFFF', '#0080FF',
  '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
  '#FFFFFF', '#C0C0C0', '#808080', '#000000',
];

export const strobeColors = [
  { name: 'Electric', color: '#06FFA5', secondary: '#00E5FF' },
  { name: 'Fire', color: '#FF6B35', secondary: '#FFD23F' },
  { name: 'Purple', color: '#8B5CF6', secondary: '#C084FC' },
  { name: 'Blue', color: '#3B82F6', secondary: '#06B6D4' },
  { name: 'White', color: '#FFFFFF', secondary: '#E5E7EB' },
  { name: 'Red', color: '#EF4444', secondary: '#F97316' },
  { name: 'Rainbow', color: '#FF0080', secondary: '#00FF80' },
  { name: 'White', color: '#FFFFFF' , secondary: '#E5E7EB' },
  { name: 'Orange', color: '#F59E0B' , secondary: '#F59E0B' },
];

export const strobeEffectTypes = [
  { id: 'pulse', name: 'Pulse', icon: Zap },
  { id: 'wave', name: 'Wave', icon: Sparkles },
  { id: 'burst', name: 'Burst', icon: Sparkles },
  { id: 'fade', name: 'Fade', icon: Sparkles },
];