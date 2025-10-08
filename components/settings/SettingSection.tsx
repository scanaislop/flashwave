import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import NeonContainer from '@/components/shared/NeonContainer';
import { settingsStyles } from '@/components/styles/settings';

interface SettingSectionProps {
  title?: string;
  icon?: ReactNode;
  glowColor?: string;
  variant?: 'default' | 'subtle';
  children: ReactNode;
}

export const SettingSection = ({ title, icon, glowColor, variant = 'default', children }: SettingSectionProps) => (
  <NeonContainer
    style={settingsStyles.section}
    glowColor={glowColor}
    variant={variant === 'subtle' ? 'subtle' : undefined}
  >
    {title && (
      <View style={settingsStyles.sectionHeader}>
        {icon}
        <Text style={settingsStyles.sectionTitle}>{title}</Text>
      </View>
    )}
    {children}
  </NeonContainer>
);
