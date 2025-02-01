// api.ts
import axios from 'axios';

export const getVoiceResponse = async (text: string) => {
  try {
    // Temporary solution: use a constant API key for development
    const ELEVENLABS_API_KEY = 'your_development_key_here';

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
      { text },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching voice response:', error);
    throw error;
  }
};