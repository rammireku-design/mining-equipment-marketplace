import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { Plus } from 'lucide-react-native';

export default function AdminHomeScreen({ navigation }) {
  const { items, inquiries } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Heavy Vehicles', 'Power Tools', 'Safety Gear', 'Spare Parts'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'Pending').length;

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ItemDetail', { item, isAdmin: true })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        {item.category ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        
        {/* Statistics Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}>Active Listings</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.primaryDark }]}>{pendingInquiriesCount}</Text>
            <Text style={styles.statLabel}>New Inquiries</Text>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              activeOpacity={0.8}
              style={[
                styles.filterChip,
                activeCategory === cat && styles.filterChipActive
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[
                styles.filterChipText,
                activeCategory === cat && styles.filterChipTextActive
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No listings found in this category.</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('UploadItem')}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
  },
  cardInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  filterScroll: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  filterChipText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
  filterChipTextActive: {
    color: colors.text,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
});
