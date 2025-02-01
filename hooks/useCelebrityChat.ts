import { useState } from 'react';
import axios from 'axios';
import * as Speech from 'expo-speech';
import { Celebrity } from '../constants/Celebrities';

const useCelebrityChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSpeak = async (input: string, celebrity: Celebrity) => {
    setIsLoading(true);
    try {
      // Simulate AI response
      const textResponse = `${celebrity.name}: ${input}`;
      
      // Speak the response
      await Speech.speak(textResponse, {
        voice: celebrity.voiceId,
        rate: 0.9,
        pitch: 1.0
      });
      
      return textResponse;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIResponse = async (input: string, celebrity: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-4',
          prompt: `You are ${celebrity.name}. Respond to the following message in your persona: ${input}`,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('AI response error:', error);
      return 'Sorry, I could not process your request.';
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = async (text: string) => {
    try {
      await Speech.speak(text);
    } catch (error) {
      console.error('Speech error:', error);
    }
  };

  return { fetchAIResponse, speakResponse, isLoading };
};

export default useCelebrityChat;