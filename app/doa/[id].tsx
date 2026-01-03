/**
 * Doa Detail Screen
 *
 * Displays the content of a specific doa/hizib
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { DOA_LIST } from '@/constants/DoaList';
import type { DoaItem } from '@/types/doa.types';

// Temporary placeholder content
const getDoaContent = (id: string) => {
  return {
    title: DOA_LIST.find((d) => d.id === id)?.name || 'Doa',
    titleArabic: DOA_LIST.find((d) => d.id === id)?.nameArabic || '',
    description: DOA_LIST.find((d) => d.id === id)?.description || '',
    message: 'Mohon maaf, konten lengkap sedang dalam pengembangan.',
  };
};

export default function DoaDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [content, setContent] = React.useState<ReturnType<typeof getDoaContent> | null>(null);

  React.useEffect(() => {
    if (id) {
      setContent(getDoaContent(id));
    }
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  if (!content) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ThemedText style={styles.backText}>← Kembali</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Kembali</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.titleArabic} type="title">
          {content.titleArabic}
        </ThemedText>
        <ThemedText style={styles.title} type="subtitle">
          {content.title}
        </ThemedText>
        <ThemedText style={styles.description}>{content.description}</ThemedText>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.noticeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <ThemedText style={styles.noticeTitle} type="heading3">
            📜 Info
          </ThemedText>
          <ThemedText style={styles.noticeText}>
            {content.message}
          </ThemedText>
          <ThemedText style={styles.noticeSubText}>
            Konten lengkap berisi:
          </ThemedText>
          <ThemedText style={styles.noticeBullet}>• Teks Arab lengkap</ThemedText>
          <ThemedText style={styles.noticeBullet}>• Transliterasi Latin</ThemedText>
          <ThemedText style={styles.noticeBullet}>• Terjemahan Bahasa Indonesia</ThemedText>
          <ThemedText style={styles.noticeBullet}>• Keterangan dan faedah</ThemedText>
        </View>
      </ScrollView>
    </View>
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
    padding: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  noticeTitle: {
    marginBottom: Spacing.md,
  },
  noticeText: {
    ...Typography.body,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  noticeSubText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  noticeBullet: {
    ...Typography.body,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.xs,
  },
});
