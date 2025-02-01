import React, { useRef, useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Dimensions,
  NativeScrollEvent,
  ViewStyle,
  ListRenderItem
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  AnimatedRef
} from 'react-native-reanimated';
import CelebrityCard from '../../components/celebrity/CelebrityCard';
import { CELEBRITIES, Celebrity } from '../../constants/Celebrities';
import { NavigationProp } from '@react-navigation/native';
import PaginationDots from '../../components/ui/PaginationDots';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const CARD_MARGIN = SCREEN_WIDTH * 0.05;
const SNAP_INTERVAL = CARD_WIDTH;

// Update the AnimatedFlatList creation
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as typeof FlatList;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<Celebrity>>(null);
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / SNAP_INTERVAL);
      setActiveIndex(index);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  });

  const renderItem: ListRenderItem<Celebrity> = ({ item, index }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [
          (index - 1) * SNAP_INTERVAL,
          index * SNAP_INTERVAL,
          (index + 1) * SNAP_INTERVAL,
        ],
        [0.9, 1, 0.9],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ scale }]
      };
    });

    return (
      <CelebrityCard 
        celebrity={item} 
        onSelect={() => navigation.navigate('celebrity-chat', { id: item.id })}
        style={animatedStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList<Celebrity>
        ref={flatListRef}
        data={CELEBRITIES}
        renderItem={renderItem}
        keyExtractor={(item: Celebrity) => item.id}
        horizontal
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}
      />
      
      <PaginationDots 
        count={CELEBRITIES.length} 
        activeIndex={activeIndex} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  list: {
    paddingHorizontal: SCREEN_WIDTH * 0.15,
  },
});
export default HomeScreen;