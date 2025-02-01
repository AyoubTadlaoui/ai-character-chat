import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  FlatList 
} from 'react-native';
import CelebritySelector from '../components/CelebritySelector';
import { VoiceButton } from '../components/VoiceInput';
import TextInputComponent from '../components/TextInput';
import useCelebrityChat from '../hooks/useCelebrityChat';
import { CELEBRITIES, Celebrity } from '../constants/Celebrities';
import CelebrityCard from '../components/celebrity/CelebrityCard';

export default function CelebrityChat() {
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity>(CELEBRITIES[0]);
  const [response, setResponse] = useState('');
  const { fetchAIResponse, speakResponse, isLoading } = useCelebrityChat();

  const handleSend = async (input: string) => {
    const aiResponse = await fetchAIResponse(input, selectedCelebrity);
    setResponse(aiResponse);
    speakResponse(aiResponse);
  };

  const renderCelebrityCard = ({ item }: { item: Celebrity }) => (
    <CelebrityCard
      celebrity={item}
      onSelect={(id) => setSelectedCelebrity(
        CELEBRITIES.find((c) => c.id === id) || CELEBRITIES[0]
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CELEBRITIES}
        renderItem={renderCelebrityCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardList}
      />
      <ScrollView style={styles.scrollView}>
        <Image 
          source={selectedCelebrity.image} 
          style={styles.image} 
        />
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.response}>{response}</Text>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <VoiceButton text={response} />
        <TextInputComponent onSend={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardList: {
    maxHeight: 200,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  response: {
    padding: 15,
    fontSize: 16,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});