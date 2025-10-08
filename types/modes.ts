import { Mic, Zap, Users } from 'lucide-react-native';

export const modes = [
  {
    id: 'sound-reactive',
    title: 'Sound Reactive',
    subtitle: 'Sync to music beats',
    icon: Mic,
    color: '#06FFA5',
    route: '/sound-reactive' as const,
  },
  {
    id: 'manual-strobe',
    title: 'Manual Strobe',
    subtitle: 'Control the flash',
    icon: Zap,
    color: '#F59E0B',
    route: '/manual-strobe' as const,
  },
  {
    id: 'party-sync',
    title: 'Party Sync',
    subtitle: 'Connect with friends',
    icon: Users,
    color: '#8B5CF6',
    route: '/party-sync' as const,
  },
  // {
  //   id: 'visual-effects',
  //   title: 'Visual Effects',
  //   subtitle: 'Choose your style',
  //   icon: Palette,
  //   color: '#EF4444',
  //   route: '/visual-effects' as const,
  // },
];
