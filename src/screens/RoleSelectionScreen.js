import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../theme/colors';
import { HardHat, ShoppingCart } from 'lucide-react-native';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>MineEquip</Text>
          <Text style={styles.subtitle}>Marketplace Showcase</Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AdminFlow')}
          >
            <View style={styles.iconContainer}>
              <HardHat color={colors.text} size={32} />
            </View>
            <Text style={styles.cardTitle}>I am an Admin</Text>
            <Text style={styles.cardDescription}>Manage inventory and upload new equipment for sale.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.cardSecondary]} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('BuyerFlow')}
          >
            <View style={[styles.iconContainer, styles.iconContainerSecondary]}>
              <ShoppingCart color={colors.primary} size={32} />
            </View>
            <Text style={styles.cardTitle}>I am a Buyer</Text>
            <Text style={styles.cardDescription}>Browse available tools, vehicles, and equipment.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: colors.primary,
    padding: 24,
    borderRadius: 20,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainerSecondary: {
    backgroundColor: colors.primaryLight,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 22,
  },
});
