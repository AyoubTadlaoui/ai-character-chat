import * as SecureStore from 'expo-secure-store';

export const initializeSecureStorage = async () => {
  try {
    await SecureStore.setItemAsync('ELEVENLABS_KEY', 'your_key_here');
    return true;
  } catch (error) {
    console.error('Error initializing secure storage:', error);
    return false;
  }
};

export const getSecureItem = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting secure item ${key}:`, error);
    return null;
  }
};