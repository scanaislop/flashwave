import { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { fonts } from '@/constants/fonts';

interface DropdownOption<T> {
  label: string;
  value: T;
  description?: string;
  leftAdornment?: React.ReactNode;
}

interface DropdownSelectProps<T> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  renderSelected?: (option: DropdownOption<T> | undefined) => React.ReactNode;
  renderOption?: (
    option: DropdownOption<T>,
    onPress: (event: GestureResponderEvent) => void,
    isActive: boolean,
  ) => React.ReactNode;
}

export function DropdownSelect<T>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
  renderSelected,
  renderOption,
}: DropdownSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: DropdownOption<T>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.display} onPress={() => setIsOpen(true)}>
        <View style={styles.displayContent}>
          {renderSelected ? (
            renderSelected(selectedOption)
          ) : (
            <Text style={styles.displayText}>
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
          )}
        </View>
        <ChevronDown size={18} color="#E2E8F0" />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option) => {
                if (renderOption) {
                  const isActive = option.value === value;
                  return (
                    <View key={option.label}>
                      {renderOption(option, () => handleSelect(option), isActive)}
                    </View>
                  );
                }

                const isActive = option.value === value;
                return (
                  <TouchableOpacity
                    key={option.label}
                    style={[styles.option, isActive && styles.optionActive]}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.8}
                  >
                    {option.leftAdornment && <View style={styles.adornment}>{option.leftAdornment}</View>}
                    <View style={styles.optionContent}>
                      <Text style={[styles.optionLabel, isActive && styles.optionLabelActive]}>
                        {option.label}
                      </Text>
                      {option.description && (
                        <Text style={styles.optionDescription}>{option.description}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 8,
    fontFamily: fonts.rajdhani.bold,
  },
  display: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.4)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayContent: {
    flex: 1,
    paddingRight: 12,
  },
  displayText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: fonts.rajdhani.medium,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.65)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    maxHeight: '60%',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#E2E8F0',
    fontFamily: fonts.rajdhani.medium,
  },
  optionLabelActive: {
    color: '#C4B5FD',
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: fonts.rajdhani.regular,
  },
  adornment: {
    marginRight: 12,
  },
});

export type { DropdownOption, DropdownSelectProps };
