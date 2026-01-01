/**
 * Doa-doa Screen (Coming Soon)
 *
 * Collection of daily supplications from PDF sources
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export default function DoaScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.title} type="title">
          أدعية
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Kumpulan Doa-doa
        </ThemedText>
        <ThemedText style={styles.description}>
          Himunan doa harian dari sumber terpercaya
        </ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedText type="heading2" style={styles.sectionTitle}>
          Coming Soon
        </ThemedText>
        <ThemedText style={styles.message}>
          Fitur kumpulan doa-doa sedang dalam pengembangan.
          Fitur ini akan berisi berbagai doa harian, doa dari Al-Quran,
          dan doa dari hadits-hadits shahih.
        </ThemedText>

        <ThemedText type="heading3" style={styles.sectionTitle}>
          Kategori Doa yang Akan Tersedia:
        </ThemedText>
        <ThemedText style={styles.featureList}>• Doa pagi dan petang</ThemedText>
        <ThemedText style={styles.featureList}>• Doa setelah shalat</ThemedText>
        <ThemedText style={styles.featureList}>• Doa makan dan minum</ThemedText>
        <ThemedText style={styles.featureList}>• Doa sebelum tidur</ThemedText>
        <ThemedText style={styles.featureList}>• Doa dari Al-Quran</ThemedText>
        <ThemedText style={styles.featureList}>• Doa dari Hadits</ThemedText>
        <ThemedText style={styles.featureList}>• Doa perlindungan</ThemedText>
        <ThemedText style={styles.featureList}>• Dan banyak lagi...</ThemedText>

        <ThemedText type="heading3" style={styles.sectionTitle}>
          Fitur Tambahan:
        </ThemedText>
        <ThemedText style={styles.featureList}>• Pencarian doa</ThemedText>
        <ThemedText style={styles.featureList}>• Bookmark doa favorit</ThemedText>
        <ThemedText style={styles.featureList}>• Mode baca offline</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.xl,
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
  content: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  message: {
    ...Typography.body,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  featureList: {
    ...Typography.body,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.lg,
  },
});
