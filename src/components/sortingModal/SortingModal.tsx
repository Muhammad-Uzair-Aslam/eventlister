import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 150,
};

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const SortingModal: React.FC<FilterBottomSheetProps> = ({ isVisible, onClose }) => {
  const translateY = useSharedValue(1000); 
  const context = useSharedValue({ y: 0 }); 

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      translateY.value = withSpring(1000, SPRING_CONFIG); 
    }
  }, [isVisible]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y; 
      translateY.value = Math.max(translateY.value, 0); 
    })
    .onEnd(() => {
      if (translateY.value > 200) {
        translateY.value = withSpring(1000, SPRING_CONFIG); 
        onClose();
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG); 
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const [priceRange, setPriceRange] = React.useState<[number, number]>([250, 1000]);
  
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />

          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceContainer}>
              <Text>${priceRange[0]}</Text>
              <Text>${priceRange[1]}</Text>
              <Text style={styles.maxPrice}>$5000</Text>
            </View>
            <Text style={styles.sectionTitle}>Sort by Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
              }}>
              <Text style={styles.inputText}>Select date range</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Sort by Category</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
              }}>
              <Text style={styles.inputText}>Select category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  resetText: {
    fontSize: 16,
    color: '#6366F1',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  maxPrice: {
    color: '#9CA3AF',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputText: {
    color: '#9CA3AF',
  },
  button: {
    backgroundColor: '#6366F1',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SortingModal;
