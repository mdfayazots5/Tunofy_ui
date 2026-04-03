import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, Animated, ViewToken } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Button } from '@components/common/Button';
import { useAppStore } from '../../store/useAppStore';
import { Music, Globe, Radio } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: '1',
    title: 'Thousands of Radio Stations',
    description: 'Access over 50,000 radio stations from all around the world in one place.',
    icon: <Radio size={120} color="#F27D26" />,
  },
  {
    id: '2',
    title: 'Discover by Genre, Country & Language',
    description: 'Find exactly what you want to hear with our powerful search and discovery tools.',
    icon: <Globe size={120} color="#F27D26" />,
  },
  {
    id: '3',
    title: 'Listen Live, Anywhere',
    description: 'Enjoy high-quality audio streaming wherever you are, on any device.',
    icon: <Music size={120} color="#F27D26" />,
  },
];

export const OnboardingScreen = () => {
  const { colors, typography } = useTheme();
  const { setOnboardingSeen } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setOnboardingSeen(true);
    }
  };

  const handleSkip = () => {
    setOnboardingSeen(true);
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slide}>
      <View style={styles.iconContainer}>
        {item.icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.h1.size }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary, fontSize: typography.body.large.size }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <View style={styles.header}>
        <Button
          label="Skip"
          variant="ghost"
          onPress={handleSkip}
          style={styles.skipButton}
        />
      </View>

      <FlatList
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity, backgroundColor: colors.brand.primary },
                ]}
              />
            );
          })}
        </View>

        <Button
          label={currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
          variant="primary"
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: spacing.sm,
  },
  slide: {
    width,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  nextButton: {
    width: '100%',
  },
});
