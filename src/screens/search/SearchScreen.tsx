import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { SearchBar } from '../../components/search/SearchBar';
import { SearchCategoryCard } from '../../components/search/SearchCategoryCard';
import { FilterChip } from '../../components/search/FilterChip';
import { FilterBottomSheet } from '../../components/search/FilterBottomSheet';
import { HorizontalCard } from '../../components/station/HorizontalCard';
import { useSearchStore } from '../../store/useSearchStore';
import { useDebounce } from '../../hooks/useDebounce';
import { SEARCH_STATIONS, TRENDING_SEARCHES } from '../../mocks/searchData';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TrendingUp, History } from 'lucide-react-native';
import { EmptyState } from '../../components/feedback/EmptyState';

import { SearchNoResultState } from '../../components/common/SearchNoResultState';

const initialLayout = { width: Dimensions.get('window').width };

export const SearchScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { history, addHistory, removeHistory, clearHistory, filters, setFilters } = useSearchStore();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'stations', title: 'Stations' },
    { key: 'genres', title: 'Genres' },
    { key: 'countries', title: 'Countries' },
  ]);

  const filteredStations = useMemo(() => {
    if (!debouncedQuery) return [];
    return SEARCH_STATIONS.filter((s) =>
      s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      s.genre.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      addHistory(text);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const renderPreSearch = () => (
    <ScrollView style={styles.preSearch} showsVerticalScrollIndicator={false}>
      {history.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <History size={18} color={colors.text.secondary} />
              <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
                Recent Searches
              </Text>
            </View>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={[styles.clearAll, { color: colors.brand.primary }]}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chipContainer}>
            {history.map((item) => (
              <FilterChip
                key={item.id}
                label={item.query}
                onPress={() => handleSearch(item.query)}
                showRemove
                onRemove={() => removeHistory(item.id)}
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <TrendingUp size={18} color={colors.text.secondary} />
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
            Trending Searches
          </Text>
        </View>
        <View style={styles.chipContainer}>
          {TRENDING_SEARCHES.map((item) => (
            <FilterChip
              key={item}
              label={item}
              onPress={() => handleSearch(item)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size, marginLeft: 0 }]}>
          Browse Categories
        </Text>
        <View style={styles.categoryGrid}>
          <SearchCategoryCard type="genre" onPress={() => navigation.navigate('ExploreGenres')} />
          <SearchCategoryCard type="language" onPress={() => navigation.navigate('ExploreLanguages')} />
          <SearchCategoryCard type="country" onPress={() => navigation.navigate('ExploreCountries')} />
        </View>
      </View>
    </ScrollView>
  );

  const StationsRoute = () => (
    <FlatList
      data={filteredStations}
      renderItem={({ item }) => (
        <HorizontalCard
          station={item}
          onPress={() => navigation.navigate('StationDetails', { stationId: item.id })}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.resultList}
      ListEmptyComponent={
        debouncedQuery ? (
          <SearchNoResultState
            query={debouncedQuery}
            onClear={handleClearSearch}
          />
        ) : null
      }
    />
  );

  const PlaceholderRoute = ({ title }: { title: string }) => (
    <View style={styles.placeholderRoute}>
      <EmptyState
        title={`${title} results`}
        description={`Search results for ${title} will appear here.`}
      />
    </View>
  );

  const renderScene = SceneMap({
    stations: StationsRoute,
    genres: () => <PlaceholderRoute title="Genre" />,
    countries: () => <PlaceholderRoute title="Country" />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.brand.primary }}
      style={{ backgroundColor: colors.surface.main }}
      labelStyle={{ color: colors.text.primary, fontWeight: 'bold', fontSize: 12 }}
      activeColor={colors.brand.primary}
      inactiveColor={colors.text.secondary}
    />
  );

  const isFilterActive = useMemo(() => {
    return filters.genres.length > 0 || 
           filters.languages.length > 0 || 
           filters.countries.length > 0 || 
           filters.sortBy !== 'popularity';
  }, [filters]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <SearchBar
        value={query}
        onChangeText={handleSearch}
        onClear={() => setQuery('')}
        onFilterPress={() => setIsFilterVisible(true)}
        isFilterActive={isFilterActive}
        autoFocus
      />

      {query.length > 0 ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      ) : (
        renderPreSearch()
      )}

      <FilterBottomSheet
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        initialFilters={filters}
        onApply={setFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preSearch: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  clearAll: {
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  resultList: {
    padding: spacing.lg,
  },
  placeholderRoute: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
