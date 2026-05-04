import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { MapPin, Clock, Plus } from 'lucide-react-native';

export default function InquiriesScreen({ navigation }) {
  const { inquiries, updateInquiryStatus } = useContext(AppContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return colors.error;
      case 'Processing': return colors.primaryDark;
      case 'Delivered': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const cycleStatus = (id, currentStatus) => {
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'Processing';
    else if (currentStatus === 'Processing') nextStatus = 'Delivered';
    
    if (currentStatus !== 'Delivered') {
      updateInquiryStatus(id, nextStatus);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.itemInfoRow}>
        <Image source={{ uri: item.item.image }} style={styles.image} resizeMode="contain" />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle} numberOfLines={2}>{item.item.title}</Text>
          <Text style={styles.itemPrice}>{item.item.price}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <MapPin color={colors.textSecondary} size={16} />
        <Text style={styles.locationText}>Deliver to: {item.location}</Text>
      </View>

      {item.status !== 'Delivered' && (
        <TouchableOpacity 
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => cycleStatus(item.id, item.status)}
        >
          <Text style={styles.actionButtonText}>
            {item.status === 'Pending' ? 'Mark as Processing' : 'Mark as Delivered'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inquiries</Text>
        <Text style={styles.headerSubtitle}>{inquiries.length} purchase requests</Text>
      </View>

      <FlatList
        data={inquiries}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Clock color={colors.textSecondary} size={48} style={{ marginBottom: 16 }} />
            <Text style={styles.emptyStateText}>No inquiries yet.</Text>
            <Text style={styles.emptyStateSub}>When buyers request items, they will appear here.</Text>
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
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemInfoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: colors.text,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
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
});
