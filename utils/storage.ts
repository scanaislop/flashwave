import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  DISCLAIMER_ACCEPTED: 'flashwave_disclaimer_accepted',
  DISCLAIMER_VERSION: 'flashwave_disclaimer_version',
};

export const CURRENT_DISCLAIMER_VERSION = '1.0';

export const saveDisclaimerAcceptance = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DISCLAIMER_ACCEPTED, 'true');
    await AsyncStorage.setItem(STORAGE_KEYS.DISCLAIMER_VERSION, CURRENT_DISCLAIMER_VERSION);
    return true;
  } catch (error) {
    console.error('Error saving disclaimer acceptance:', error);
    return false;
  }
};

export const hasAcceptedCurrentDisclaimer = async () => {
  try {
    const accepted = await AsyncStorage.getItem(STORAGE_KEYS.DISCLAIMER_ACCEPTED);
    const version = await AsyncStorage.getItem(STORAGE_KEYS.DISCLAIMER_VERSION);
    
    return accepted === 'true' && version === CURRENT_DISCLAIMER_VERSION;
  } catch (error) {
    console.error('Error checking disclaimer acceptance:', error);
    return false;
  }
};