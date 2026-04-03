import React, { useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { AppHeader } from '../../components/layout/AppHeader';
import { HorizontalCard } from '../../components/station/HorizontalCard';
import { SEARCH_STATIONS } from '../../mocks/searchData';
import { ChevronLeft } from 'lucide-react-native';
import { IconButton } from '../../components/common/IconButton';
import { EmptyState } from '../../components/feedback/EmptyState';

export const FilteredStationListScreen = ({ route, navigation }: any) => {
  const { colors } = useTheme();
  const { type, label } = route.params;

  const filteredStations = useMemo(() => {
    return SEARCH_STATIONS.filter((s) => {
      if (type === 'genre') return s.genre === label;
      if (type === 'language') return s.language === label;
      if (type === 'country') return s.country === label;
      return true;
    });
  }, [type, label]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <AppHeader
        title={label}
        leftAction={
          <IconButton
            icon={<ChevronLeft size={24} color={colors.text.primary} />}
            onPress={() => navigation.goBack()}
          />
        }
      />

      <FlatList
        data={filteredStations}
        renderItem={({ item }) => (
          <HorizontalCard
            station={item}
            onPress={() => navigation.navigate('StationDetails', { stationId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="No stations found"
            description={`We couldn't find any stations for ${label}`}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
});
