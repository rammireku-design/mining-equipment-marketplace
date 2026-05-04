import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { ArrowLeft, MessageCircle, MapPin, Clock, CheckCircle } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { addInquiry, deleteItem } = useContext(AppContext);
  const [isInquiring, setIsInquiring] = useState(false);
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteItem(item.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleInquire = () => {
    if (!isInquiring) {
      setIsInquiring(true);
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter a delivery location');
      return;
    }
    
    addInquiry(item, location);
    setSubmitted(true);
    setIsInquiring(false);
    
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.conditionText}>Condition: {item.condition}</Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <MapPin color={colors.textSecondary} size={20} />
            <Text style={styles.infoText}>Main Mining Site A</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock color={colors.textSecondary} size={20} />
            <Text style={styles.infoText}>Available immediately</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {route.params?.isAdmin ? (
          <View style={styles.adminActionRow}>
            <TouchableOpacity 
              style={[styles.adminButton, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditItem', { item })}
            >
              <Text style={[styles.contactButtonText, { color: colors.text }]}>Edit Listing</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.adminButton, { backgroundColor: 'transparent', borderColor: colors.error, borderWidth: 1 }]} 
              activeOpacity={0.8}
              onPress={handleDelete}
            >
              <Text style={[styles.contactButtonText, { color: colors.error }]}>Delete Item</Text>
            </TouchableOpacity>
          </View>
        ) : submitted ? (
          <View style={[styles.contactButton, { backgroundColor: colors.success }]}>
            <CheckCircle color="#fff" size={20} style={{ marginRight: 8 }} />
            <Text style={[styles.contactButtonText, { color: '#fff' }]}>Inquiry Sent!</Text>
          </View>
        ) : (
          <>
            {isInquiring && (
              <TextInput
                style={styles.locationInput}
                placeholder="Enter your delivery location..."
                placeholderTextColor={colors.textSecondary}
                value={location}
                onChangeText={setLocation}
                autoFocus
              />
            )}
            <TouchableOpacity style={styles.contactButton} activeOpacity={0.9} onPress={handleInquire}>
              <MessageCircle color={colors.text} size={20} style={{ marginRight: 8 }} />
              <Text style={styles.contactButtonText}>
                {isInquiring ? 'Confirm Inquiry' : 'Inquire to Buy'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 24,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
    textTransform: 'uppercase',
  },
  conditionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primaryDark,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  locationInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
    color: colors.text,
  },
  contactButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  adminActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  adminButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
