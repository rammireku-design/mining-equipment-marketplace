import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { colors } from '../../theme/colors';
import { Upload, Check, Wand2, RotateCcw } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadItemScreen({ navigation }) {
  const { addItem } = useContext(AppContext);
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
  });

  const [imageState, setImageState] = useState('empty');
  const [rawImageUri, setRawImageUri] = useState(null);

  // Still use a clean Unsplash image for the "enhanced" result as a showcase simulation
  const ENHANCED_IMAGE = 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600&auto=format&fit=crop'; 

  const handleUploadRaw = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // User requested no cropping in-app
      quality: 1,
    });

    if (!result.canceled) {
      setRawImageUri(result.assets[0].uri);
      setImageState('raw');
    }
  };

  const handleEnhance = () => {
    setImageState('processing');
    setTimeout(() => {
      setImageState('enhanced');
    }, 2000); 
  };

  const handleRevert = () => {
    setImageState('raw');
  };
  
  const handleChangeImage = () => {
    setImageState('empty');
    setRawImageUri(null);
  };

  const [currency, setCurrency] = useState('GH₵');

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.category || imageState === 'empty') {
      alert('Please fill out all required fields (Title, Price, Category, and Image).');
      return;
    }

    addItem({
      ...form,
      price: `${currency} ${form.price}`,
      image: rawImageUri, 
    });
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>New Listing</Text>
          </View>

          {/* Image Upload Area */}
          {imageState === 'empty' && (
            <TouchableOpacity style={styles.imageUploadArea} activeOpacity={0.8} onPress={handleUploadRaw}>
              <View style={styles.iconCircle}>
                <Upload color={colors.primaryDark} size={28} />
              </View>
              <Text style={styles.uploadText}>Tap to upload photos</Text>
            </TouchableOpacity>
          )}

          {imageState === 'processing' && (
            <View style={styles.imageUploadArea}>
              <ActivityIndicator size="large" color={colors.primaryDark} />
              <Text style={[styles.uploadText, { marginTop: 16 }]}>Processing...</Text>
            </View>
          )}

          {(imageState === 'raw' || imageState === 'enhanced') && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: imageState === 'enhanced' ? rawImageUri : rawImageUri }} 
                style={styles.previewImage} 
                resizeMode="contain"
              />
              
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.optionalEnhanceBtn} activeOpacity={0.8} onPress={handleChangeImage}>
                  <RotateCcw color={colors.textSecondary} size={16} style={{ marginRight: 6 }} />
                  <Text style={[styles.optionalEnhanceText, { color: colors.textSecondary }]}>Change Image</Text>
                </TouchableOpacity>

                {imageState === 'raw' ? (
                  <TouchableOpacity style={styles.optionalEnhanceBtn} activeOpacity={0.8} onPress={handleEnhance}>
                    <Wand2 color={colors.primaryDark} size={16} style={{ marginRight: 6 }} />
                    <Text style={styles.optionalEnhanceText}>Enhance (Optional)</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.optionalEnhanceBtn} activeOpacity={0.8} onPress={handleRevert}>
                    <RotateCcw color={colors.textSecondary} size={16} style={{ marginRight: 6 }} />
                    <Text style={[styles.optionalEnhanceText, { color: colors.textSecondary }]}>Revert to Original</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

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
              <Check color={colors.text} size={20} style={{ marginRight: 8 }} />
              <Text style={styles.submitButtonText}>Publish Listing</Text>
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
  imageUploadArea: {
    height: 180,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    color: colors.primaryDark,
    fontWeight: '600',
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
    backgroundColor: colors.primary,
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
    color: colors.text,
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
  imagePreviewContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
  optionalEnhanceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionalEnhanceText: {
    color: colors.primaryDark,
    fontWeight: '600',
    fontSize: 14,
  },
});
