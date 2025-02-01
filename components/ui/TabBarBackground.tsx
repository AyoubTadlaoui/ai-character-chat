import React from 'react';
import { View } from 'react-native';

const TabBarBackground = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    />
  );
};

export default TabBarBackground;