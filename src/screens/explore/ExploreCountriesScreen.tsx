import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  SectionList,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing, borderRadius } from '@theme/tokens';
import { AppHeader } from '../../components/layout/AppHeader';
import { SearchBar } from '../../components/search/SearchBar';
import { CountryCard } from '../../components/explore/CountryCard';
import { EXPLORE_COUNTRIES } from '../../mocks/searchData';
import { ChevronLeft, LayoutGrid, List } from 'lucide-react-native';
import { IconButton } from '../../components/common/IconButton';

export const ExploreCountriesScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCountries = useMemo(() => {
    return EXPLORE_COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const groupedCountries = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    filteredCountries.forEach((c) => {
      const char = c.name.charAt(0).toUpperCase();
      if (!groups[char]) groups[char] = [];
      groups[char].push(c);
    });
    return Object.keys(groups)
      .sort()
      .map((char) => ({
        title: char,
        data: groups[char],
      }));
  }, [filteredCountries]);

  const handleCountryPress = (country: any) => {
    navigation.navigate('FilteredStationList', {
      type: 'country',
      id: country.id,
      label: country.name,
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <CountryCard country={item} variant={viewMode} onPress={handleCountryPress} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <AppHeader
        title="Explore Countries"
        leftAction={
          <IconButton
            icon={<ChevronLeft size={24} color={colors.text.primary} />}
            onPress={() => navigation.goBack()}
          />
        }
        rightAction={
          <IconButton
            icon={viewMode === 'grid' ? <List size={24} color={colors.brand.primary} /> : <LayoutGrid size={24} color={colors.brand.primary} />}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          />
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        showFilter={false}
        placeholder="Search countries..."
      />

      {viewMode === 'grid' ? (
        <FlatList
          data={filteredCountries}
          renderItem={renderItem}
          numColumns={2}
          key="grid"
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <SectionList
          sections={groupedCountries}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.sectionHeader, { backgroundColor: colors.surface.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
                {title}
              </Text>
            </View>
          )}
          key="list"
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
});
