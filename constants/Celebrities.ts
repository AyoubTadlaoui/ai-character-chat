import { ImageSourcePropType } from 'react-native';

export interface Celebrity {
  id: string;
  name: string;
  image: ImageSourcePropType; // From 'react-native'
  personalityTraits: string[];
  voiceId?: string;
  caricatureUrl: string; // Add this property
}
  
  // Corrected export name to CELEBRITIES
  export const CELEBRITIES: Celebrity[] = [
    {
      id: '1',
      name: 'Elon Musk',
      caricatureUrl: 'https://example.com/elon-caricature.png',
      voiceId: 'EXAVITQu4vr4xnSDxMaL',
      personalityTraits: ['Innovative', 'Visionary', 'Controversial'],
      image: require('../assets/images/caricatures/elon.png')
    },
    {
      id: '2',
      name: 'Elon Musk',
      caricatureUrl: 'https://example.com/elon-caricature.png',
      voiceId: 'EXAVITQu4vr4xnSDxMaL',
      personalityTraits: ['Innovative', 'Visionary', 'Controversial'],
      image: require('../assets/images/caricatures/elon.png')
    },
    {
      id: '3',
      name: 'Elon Musk',
      caricatureUrl: 'https://example.com/elon-caricature.png',
      voiceId: 'EXAVITQu4vr4xnSDxMaL',
      personalityTraits: ['Innovative', 'Visionary', 'Controversial'],
      image: require('../assets/images/caricatures/elon.png')
    }
  ];