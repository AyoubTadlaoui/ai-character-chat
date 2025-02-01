export const DEMO_MODE = true;

export const getMockResponse = (celebrity: string) => ({
  text: `${celebrity} mock response: This is a demo preview!`,
  // Ensure the path is correct relative to this file
  audio: require('../../assets/demo-audio.mp3')
});

const DemoMode = {
  enabled: true,
  mockResponse: (celebrity: string) => ({
    text: `${celebrity} mock response`,
    audio: null
  })
};

export default DemoMode;