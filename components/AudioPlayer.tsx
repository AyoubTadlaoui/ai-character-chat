import { Audio } from 'expo-av';

const playAudio = async (url: string) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  const { sound } = await Audio.Sound.createAsync(
    { uri: url },
    { shouldPlay: true }
  );
  await sound.playAsync();
};