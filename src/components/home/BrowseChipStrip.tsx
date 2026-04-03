import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { Category } from '../../types/home';
import { MiniChip } from '../station/MiniChip';
import { SectionHeader } from '../layout/SectionHeader';

interface BrowseChipStripProps {
  title: string;
  data: Category[];
  onChipPress?: (item: Category) => void;
  onViewAllPress?: () => void;
}

export const BrowseChipStrip: React.FC<BrowseChipStripProps> = ({
  title,
  data,
  onChipPress,
  onViewAllPress,
}) => {

  const displayData = data.slice(0, 8);

  const renderItem = ({ item }: { item: Category }) => (
    <MiniChip item={item} onPress={() => onChipPress?.(item)} />
  );

  const renderFooter = () => (
    <MiniChip
      item={{ id: 'view_all', name: 'View All' }}
      onPress={onViewAllPress}
      isViewAll
    />
  );

  return (
    <View style={styles.container}>
      <SectionHeader title={title} onPress={onViewAllPress} showViewAll={false} />
      <FlatList
        data={displayData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
});
