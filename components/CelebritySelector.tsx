import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CELEBRITIES, Celebrity } from '../constants/Celebrities';

interface CelebritySelectorProps {
  selectedCelebrity: string;
  onSelect: (celebrityId: string) => void;
}

const CelebritySelector: React.FC<CelebritySelectorProps> = ({ 
  selectedCelebrity, 
  onSelect 
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>Select a Celebrity:</Text>
    <Picker
      selectedValue={selectedCelebrity}
      onValueChange={onSelect}
      style={styles.picker}
    >
      {CELEBRITIES.map((celebrity: Celebrity) => (
        <Picker.Item 
          key={celebrity.id} 
          label={celebrity.name} 
          value={celebrity.id} 
        />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default CelebritySelector;