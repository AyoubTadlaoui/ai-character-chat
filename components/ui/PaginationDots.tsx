import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ count, activeIndex }) => (
  <View style={styles.container}>
    {Array.from({ length: count }).map((_, index) => (
      <View 
        key={index}
        style={[
          styles.dot,
          index === activeIndex && styles.activeDot
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0a7ea4',
    width: 20,
  },
});

export default PaginationDots;