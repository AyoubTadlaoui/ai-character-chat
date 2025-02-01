// components/VoiceInput.tsx
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { getVoiceResponse } from '../utils/api';

interface VoiceProps {
  text: string;
}

export const VoiceButton: React.FC<VoiceProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  const playAudio = async () => {
    try {
      setIsPlaying(true);
      const audioData = await getVoiceResponse(text);
      
      // Convert ArrayBuffer to base64 properly
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(audioData))
      );

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mp3;base64,${base64String}` },
        { shouldPlay: true }
      );

      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Add missing closing brace here
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={playAudio} 
        style={styles.button}
        disabled={isPlaying}
      >
        <MaterialIcons 
          name={isPlaying ? "volume-off" : "volume-up"} 
          size={24} 
          color="#0a7ea4" 
        />
      </TouchableOpacity>
    </View>
  );
}; // This closing brace was missing

// Add styles
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  button: {
    padding: 8,
  },
});