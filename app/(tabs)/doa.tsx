/**
 * Doa-doa Screen
 *
 * Collection of daily supplications, hizib, and amalan
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { DOA_LIST, DOA_CATEGORY_LABELS, PDF_MAP } from '@/constants/DoaList';
import { getDoaContent } from '@/constants/DoaContentMap';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import type { DoaItem, DoaCategory } from '@/types/doa.types';
import { IconSymbol } from '@/components/ui/icon-symbol';

// PDF Viewer Component
function PDFViewer({ assetModule }: { assetModule: number }) {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadAsset() {
      try {
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();
        setLocalUri(asset.localUri);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF asset:', error);
        setLoading(false);
      }
    }
    loadAsset();
  }, [assetModule]);

  if (loading || !localUri) {
    return (
      <View style={detailStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5A3D" />
        <ThemedText style={detailStyles.loadingText}>Memuat PDF...</ThemedText>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: localUri }}
      style={detailStyles.webview}
      scrollEnabled={true}
      bounces={false}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
    />
  );
}

// Doa Detail Modal
function DoaDetailModal({
  visible,
  doa,
  onClose,
}: {
  visible: boolean;
  doa: DoaItem | null;
  onClose: () => void;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!doa) return null;

  const arabicContent = getDoaContent(doa.sourceKey);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View style={[detailStyles.container, { backgroundColor: '#FFFFFF' }]}>
        {/* Header */}
        <View style={[detailStyles.header, { backgroundColor: colors.primary }]}>
          <TouchableOpacity onPress={onClose} style={detailStyles.backButton}>
            <ThemedText style={detailStyles.backText}>← Kembali</ThemedText>
          </TouchableOpacity>
          <ThemedText style={detailStyles.titleArabic} type="title">
            {doa.nameArabic}
          </ThemedText>
          <ThemedText style={detailStyles.title} type="subtitle">
            {doa.name}
          </ThemedText>
          <ThemedText style={detailStyles.description}>{doa.description}</ThemedText>
        </View>

        {/* Content */}
        {doa.type === 'pdf' ? (
          <View style={detailStyles.pdfContainer}>
            <PDFViewer assetModule={PDF_MAP[doa.sourceKey]} />
          </View>
        ) : (
          <ScrollView
            style={detailStyles.content}
            contentContainerStyle={detailStyles.contentContainer}
            showsVerticalScrollIndicator={true}
          >
            {arabicContent ? (
              <View style={[detailStyles.textContainer, { backgroundColor: '#FFFBF0' }]}>
                {arabicContent.map((ayah, index) => (
                  <View key={`ayah-${index}-${doa.id}`} style={detailStyles.ayahContainer}>
                    <View style={[detailStyles.ayahNumber, { backgroundColor: colors.primary }]}>
                      <ThemedText style={detailStyles.ayahNumberText}>{index + 1}</ThemedText>
                    </View>
                    <ThemedText style={detailStyles.arabicText}>{ayah}</ThemedText>
                  </View>
                ))}
              </View>
            ) : (
              <View style={[detailStyles.errorCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <ThemedText style={detailStyles.errorTitle}>Konten Tidak Tersedia</ThemedText>
                <ThemedText style={detailStyles.errorText}>
                  Mohon maaf, konten untuk {doa.name} sedang dalam pengembangan.
                </ThemedText>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const CATEGORY_ICONS: Record<DoaCategory, any> = {
  amalan: 'book.fill',
  hizib: 'staroflife.fill',
  doa_harian: 'hands.sparkles.fill',
  rawatib: 'sparkles',
};

const CATEGORY_COLORS: Record<DoaCategory, string> = {
  amalan: '#059669',
  hizib: '#7C3AED',
  doa_harian: '#0284C7',
  rawatib: '#D97706',
};

export default function DoaScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DoaCategory | 'all'>('all');
  const [selectedDoa, setSelectedDoa] = useState<DoaItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Group doa by category
  const groupedDoa = DOA_LIST.reduce((acc, doa) => {
    if (!acc[doa.category]) {
      acc[doa.category] = [];
    }
    acc[doa.category].push(doa);
    return acc;
  }, {} as Record<DoaCategory, DoaItem[]>);

  // Filter doa based on search and category
  const filteredDoa = DOA_LIST.filter((doa) => {
    const matchesSearch =
      doa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.nameArabic.includes(searchQuery) ||
      doa.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDoaPress = (doa: DoaItem) => {
    setSelectedDoa(doa);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDoa(null);
  };

  const categories: (DoaCategory | 'all')[] = ['all', 'amalan', 'hizib', 'doa_harian', 'rawatib'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.title} type="title">
          أدعية
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Kumpulan Doa-doa
        </ThemedText>
        <ThemedText style={styles.description}>
          Himpunan doa harian, hizib, dan amalan
        </ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchTextInput, { color: colors.text }]}
            placeholder="Cari doa atau hizib..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const categoryLabel = category === 'all' ? 'Semua' : DOA_CATEGORY_LABELS[category];

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  { color: isSelected ? '#FFFFFF' : colors.text },
                ]}
              >
                {categoryLabel}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Doa List */}
      <ScrollView style={styles.content} contentContainerStyle={styles.listContent}>
        {searchQuery.length > 0 || selectedCategory !== 'all' ? (
          // Filtered list
          filteredDoa.length > 0 ? (
            filteredDoa.map((doa) => <DoaCard key={doa.id} doa={doa} colors={colors} onPress={handleDoaPress} />)
          ) : (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Tidak ada doa yang ditemukan</ThemedText>
            </View>
          )
        ) : (
          // Grouped list by category
          Object.entries(groupedDoa).map(([category, items]) => (
            <View key={category} style={styles.categorySection}>
              <View style={[styles.categoryHeader, { backgroundColor: colors.surface }]}>
                <IconSymbol
                  name={CATEGORY_ICONS[category as DoaCategory]}
                  size={24}
                  color={CATEGORY_COLORS[category as DoaCategory]}
                />
                <ThemedText style={styles.categoryTitle}>
                  {DOA_CATEGORY_LABELS[category as DoaCategory]}
                </ThemedText>
                <ThemedText style={styles.categoryCount}>({items.length})</ThemedText>
              </View>
              {items.map((doa) => (
                <DoaCard key={doa.id} doa={doa} colors={colors} onPress={handleDoaPress} />
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* Detail Modal */}
      <DoaDetailModal
        visible={modalVisible}
        doa={selectedDoa}
        onClose={handleCloseModal}
      />
    </View>
  );
}

// Doa Card Component
function DoaCard({
  doa,
  colors,
  onPress,
}: {
  doa: DoaItem;
  colors: typeof Colors.light;
  onPress: (doa: DoaItem) => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.doaCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => onPress(doa)}
      activeOpacity={0.7}
    >
      <View style={styles.doaCardLeft}>
        <ThemedText style={styles.doaNameArabic}>{doa.nameArabic}</ThemedText>
        <ThemedText style={[styles.doaName, { color: colors.primary }]}>{doa.name}</ThemedText>
        <ThemedText style={[styles.doaDescription, { color: colors.textSecondary }]}>
          {doa.description}
        </ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    alignItems: 'center',
  },
  title: {
    ...Typography.arabicLarge,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.heading3,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  searchTextInput: {
    ...Typography.body,
    flex: 1,
    marginLeft: Spacing.sm,
    marginRight: Spacing.sm,
    height: 40,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  categorySection: {
    marginBottom: Spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTitle: {
    ...Typography.heading3,
    fontWeight: '700',
    flex: 1,
  },
  categoryCount: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  doaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  doaCardLeft: {
    flex: 1,
  },
  doaNameArabic: {
    ...Typography.arabic,
    marginBottom: Spacing.xs,
  },
  doaName: {
    ...Typography.heading4,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  doaDescription: {
    ...Typography.bodySmall,
    lineHeight: 18,
  },
  emptyContainer: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    textAlign: 'center',
  },
});

// Detail Modal Styles
const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: Spacing.lg,
    top: Spacing.xxxl,
    zIndex: 1,
  },
  backText: {
    ...Typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  titleArabic: {
    ...Typography.arabicLarge,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  title: {
    ...Typography.heading3,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xl,
  },
  textContainer: {
    padding: Spacing.lg,
    borderRadius: 0,
    minHeight: '100%',
  },
  ayahContainer: {
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  ayahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  ayahNumberText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  arabicText: {
    ...Typography.arabicLarge,
    lineHeight: 60,
    textAlign: 'right',
    writingDirection: 'rtl',
    color: '#1F2937',
  },
  errorCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  errorTitle: {
    ...Typography.heading3,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  errorText: {
    ...Typography.body,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    ...Typography.body,
    marginTop: Spacing.md,
    color: '#2D5A3D',
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webview: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
