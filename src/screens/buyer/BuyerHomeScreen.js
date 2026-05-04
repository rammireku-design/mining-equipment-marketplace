import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { Search, Filter } from 'lucide-react-native';

export default function BuyerHomeScreen({ navigation }) {
  const { items } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ItemDetail', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        {item.category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Equipment Marketplace</Text>
        <Text style={styles.subtitle}>Find quality used mining gear</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color={colors.textSecondary} size={20} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search tools, vehicles..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 12,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 12,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    height: 40, // fix height for 2 lines
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
});
