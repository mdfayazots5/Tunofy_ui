import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { spacing } from '@theme/tokens';
import { AppHeader } from '../../components/layout/AppHeader';
import { SearchBar } from '../../components/search/SearchBar';
import { LanguageCard } from '../../components/explore/LanguageCard';
import { EXPLORE_LANGUAGES } from '../../mocks/searchData';
import { ChevronLeft, LayoutGrid, List } from 'lucide-react-native';
import { IconButton } from '../../components/common/IconButton';

export const ExploreLanguagesScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredLanguages = useMemo(() => {
    return EXPLORE_LANGUAGES.filter((l) =>
      l.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleLanguagePress = (language: any) => {
    navigation.navigate('FilteredStationList', {
      type: 'language',
      id: language.id,
      label: language.name,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface.main }]}>
      <AppHeader
        title="Explore Languages"
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
        placeholder="Search languages..."
      />

      <FlatList
        data={filteredLanguages}
        renderItem={({ item }) => (
          <LanguageCard language={item} variant={viewMode} onPress={handleLanguagePress} />
        )}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
});
