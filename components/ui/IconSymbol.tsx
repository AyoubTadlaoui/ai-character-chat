import React from 'react';
import { Text } from 'react-native';

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = 'black' }) => {
  return (
    <Text style={{ fontSize: size, color }}>
      {name}
    </Text>
  );
};