import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Hand } from 'lucide-react-native';
import GlowButton from '@/components/shared/GlowButton';
import { manualStyles } from '@/components/styles/manual';

interface ManualActionButtonsProps {
  isManualMode: boolean;
  isStrobing: boolean;
  onManualFlash: () => void;
  onToggleStrobe: () => void;
  onFullscreen: () => void;
}

export const ManualActionButtons = ({
  isManualMode,
  isStrobing,
  onManualFlash,
  onToggleStrobe,
  onFullscreen,
}: ManualActionButtonsProps) => (
  <View style={manualStyles.controlButtons}>
    {isManualMode && isStrobing && (
      <TouchableOpacity onPress={onManualFlash} style={manualStyles.tapToFlashButton} activeOpacity={0.6}>
        <LinearGradient colors={['#F59E0B', '#F97316']} style={manualStyles.tapGradient}>
          <Text style={manualStyles.tapToFlashText}>TAP TO FLASH</Text>
          <Hand size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    )}

    <GlowButton title="Fullscreen Mode" onPress={onFullscreen} variant="secondary" size="large" style={manualStyles.fullscreenButton} />

    <GlowButton
      title={isStrobing ? 'Stop Strobe' : 'Start Strobe'}
      onPress={onToggleStrobe}
      variant={isStrobing ? 'danger' : 'primary'}
      size="large"
      style={manualStyles.primaryButton}
    />
  </View>
);
