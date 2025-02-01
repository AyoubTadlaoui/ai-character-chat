import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface TextInputComponentProps {
  onSend: (text: string) => void;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 40,
  },
});

export default TextInputComponent;