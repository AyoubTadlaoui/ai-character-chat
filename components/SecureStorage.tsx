// components/SecureStorage.tsx
import * as SecureStore from 'expo-secure-store';

export const setApiKey = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
    throw new Error(`Failed to store ${key}`);
  }
};

export const getApiKey = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

export const deleteApiKey = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
    throw new Error(`Failed to delete ${key}`);
  }
};

export const initializeKeys = async () => {
  try {
    const elevenLabsKey = await getApiKey('ELEVENLABS_KEY');
    if (!elevenLabsKey) {
      console.warn('ElevenLabs API key not found. Please add it in settings.');
    }
  } catch (error) {
    console.error('Error initializing API keys:', error);
  }
};