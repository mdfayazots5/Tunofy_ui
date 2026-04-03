import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from 'react-native';
import { Banner } from '../../types/home';
import { FeaturedCard } from '../station/FeaturedCard';
import { DotIndicator } from './DotIndicator';
import { spacing } from '@theme/tokens';

const { width } = Dimensions.get('window');
const AUTOPLAY_INTERVAL = 4000;

interface FeaturedBannerCarouselProps {
  data: Banner[];
  onPress?: (banner: Banner) => void;
}

export const FeaturedBannerCarousel: React.FC<FeaturedBannerCarouselProps> = ({
  data,
  onPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isUserInteracting = useRef(false);

  const startAutoplay = () => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (!isUserInteracting.current && data.length > 0) {
        const nextIndex = (currentIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, data.length]);

  const onScrollBeginDrag = () => {
    isUserInteracting.current = true;
    stopAutoplay();
  };

  const onScrollEndDrag = () => {
    isUserInteracting.current = false;
    startAutoplay();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }: { item: Banner }) => (
    <View style={styles.slide}>
      <FeaturedCard banner={item} onPress={onPress} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatListRef}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      <DotIndicator
        data={data}
        scrollX={scrollX}
        containerStyle={styles.pagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  slide: {
    width: width,
    paddingHorizontal: spacing.lg,
  },
  pagination: {
    marginTop: -spacing.xl,
    marginBottom: spacing.sm,
  },
});
