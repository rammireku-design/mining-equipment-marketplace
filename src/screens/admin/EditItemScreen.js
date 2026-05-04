import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { Check, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const { updateItem } = useContext(AppContext);

  // Extract raw price number and currency if possible
  const rawPriceMatch = item.price.match(/([\d,.]+)/);
  const rawPriceStr = rawPriceMatch ? rawPriceMatch[0] : '';
  const currentCurrency = item.price.includes('$') ? '$' : 'GH₵';

  const [form, setForm] = useState({
    title: item.title || '',
    price: rawPriceStr || '',
    category: item.category || '',
    condition: item.condition || '',
    description: item.description || '',
  });

  const [currency, setCurrency] = useState(currentCurrency);
  const [imageUri, setImageUri] = useState(item.image);

  const handleUploadNewImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, 
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.category) {
      alert('Please fill out all required fields.');
      return;
    }

    updateItem(item.id, {
      ...form,
      price: `${currency} ${form.price}`,
      image: imageUri,
    });
    
    // Go back to the Admin Dashboard (pop to top or just go back twice)
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Edit Listing</Text>
          </View>

          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.previewImage} 
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.changeImageBtn} activeOpacity={0.8} onPress={handleUploadNewImage}>
              <ImageIcon color={colors.textSecondary} size={16} style={{ marginRight: 6 }} />
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Caterpillar 320 Excavator"
                value={form.title}
                onChangeText={(t) => setForm({...form, title: t})}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Price</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity 
                    onPress={() => setCurrency(currency === 'GH₵' ? '$' : 'GH₵')}
                    style={styles.currencyToggle}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.currencyToggleText}>{currency}</Text>
                  </TouchableOpacity>
                  <TextInput 
                    style={[styles.input, { flex: 1, marginLeft: 8 }]} 
                    placeholder="e.g. 1500"
                    keyboardType="numeric"
                    value={form.price}
                    onChangeText={(t) => setForm({...form, price: t})}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Condition</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. Good"
                  value={form.condition}
                  onChangeText={(t) => setForm({...form, condition: t})}
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {['Heavy Vehicles', 'Power Tools', 'Safety Gear', 'Spare Parts'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.8}
                    style={[
                      styles.categoryChip,
                      form.category === cat && styles.categoryChipActive
                    ]}
                    onPress={() => setForm({ ...form, category: cat })}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      form.category === cat && styles.categoryChipTextActive
                    ]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Provide details about the item's condition, history, and specs."
                multiline
                numberOfLines={4}
                value={form.description}
                onChangeText={(t) => setForm({...form, description: t})}
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, (!form.title || !form.price) && styles.submitButtonDisabled]}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Check color="#fff" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.submitButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  imagePreviewContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  changeImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  changeImageText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  form: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  currencyToggle: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 54, // Same height as input
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  currencyToggleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  categoryChipText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  categoryChipTextActive: {
    color: colors.text,
  },
});
