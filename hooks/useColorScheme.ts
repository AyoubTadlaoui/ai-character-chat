// hooks/useColorScheme.ts
import { useColorScheme as _useColorScheme } from 'react-native';
import { ColorScheme } from '@/constants/Colors';

export function useColorScheme(): ColorScheme {
  return (_useColorScheme() as ColorScheme) || 'light';
}