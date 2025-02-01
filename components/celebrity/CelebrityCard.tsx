import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ViewStyle, Image } from 'react-native';
import { Celebrity } from '../../constants/Celebrities';
import Animated from 'react-native-reanimated';

interface CelebrityCardProps {
  celebrity: Celebrity;
  onSelect: (celebrityId: string) => void;
  style?: Animated.AnimateStyle<ViewStyle>; // Proper type definition
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({ celebrity, onSelect, style }) => {
  return (
    <Animated.View
      style={[
        styles.card,
        style
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={celebrity.image}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.name}>{celebrity.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSelect(celebrity.id)}
      >
        <Text style={styles.buttonText}>Chat Now</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
  },
  avatarContainer: {
    width: CARD_WIDTH * 0.5,
    height: CARD_WIDTH * 0.5,
    borderRadius: CARD_WIDTH * 0.25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CelebrityCard;