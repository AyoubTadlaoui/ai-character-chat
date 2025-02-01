import React from 'react';
import { Pressable, GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export const HapticTab: React.FC<BottomTabBarButtonProps> = (props) => {
  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onPress?.(e);
  };

  return (
    <Pressable {...props} onPress={handlePress}>
      {props.children}
    </Pressable>
  );
};