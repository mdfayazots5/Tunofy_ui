import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { AppHeader } from '../../components/layout/AppHeader';
import { SearchBar } from '../../components/search/SearchBar';
import { GenreCard } from '../../components/explore/GenreCard';
import { EXPLORE_GENRES } from '../../mocks/searchData';
import { ChevronLeft } from 'lucide-react-native';
import { IconButton } from '../../components/common/IconButton';

export const ExploreGenresScreen = ({ navigation }: any) => {
  const { colors, typography } = useTheme();
  const [query, setQuery] = useState('');

  const filteredGenres = useMemo(() => {
    return EXPLORE_GENRES.filter((g) =>
      g.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const popularGenres = useMemo(() => EXPLORE_GENRES.slice(0, 6), []);

  const handleGenrePress = (genre: any) => {
    navigation.navigate('FilteredStationList', {
      type: 'genre',
      id: genre.id,
      label: genre.name,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <AppHeader
        title="Explore Genres"
        leftAction={
          <IconButton
            icon={<ChevronLeft size={24} color={colors.text.primary} />}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        showFilter={false}
        placeholder="Search genres..."
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {!query && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
              Popular Genres
            </Text>
            <FlatList
              data={popularGenres}
              renderItem={({ item }) => (
                <GenreCard genre={item} variant="horizontal" onPress={handleGenrePress} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary, fontSize: typography.heading.small.size }]}>
            All Genres
          </Text>
          <FlatList
            data={filteredGenres}
            renderItem={({ item }) => (
              <GenreCard genre={item} variant="grid" onPress={handleGenrePress} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.gridList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginLeft: spacing.lg,
    marginBottom: spacing.md,
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
  },
  gridList: {
    paddingHorizontal: spacing.md,
  },
});
