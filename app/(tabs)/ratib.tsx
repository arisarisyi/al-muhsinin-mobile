/**
 * Ratib Al-Haddad Screen (Coming Soon)
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export default function RatibScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <ThemedText style={styles.title} type="title">
          راتب الحدّاد
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          Ratib Al-Haddad
        </ThemedText>
        <ThemedText style={styles.description}>
          Wirid dan zikir pembuka pintu rahmat
        </ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedText type="heading2" style={styles.sectionTitle}>
          Coming Soon
        </ThemedText>
        <ThemedText style={styles.message}>
          Fitur Ratib Al-Haddad sedang dalam pengembangan.
          Fitur ini akan berisi teks lengkap wirid Ratib Al-Haddad
          dengan terjemahan bahasa Indonesia dan Melayu.
        </ThemedText>

        <ThemedText type="heading3" style={styles.sectionTitle}>
          Fitur yang Akan Tersedia:
        </ThemedText>
        <ThemedText style={styles.featureList}>• Teks Arab lengkap</ThemedText>
        <ThemedText style={styles.featureList}>• Transliterasi</ThemedText>
        <ThemedText style={styles.featureList}>• Terjemahan Indonesia</ThemedText>
        <ThemedText style={styles.featureList}>• Audio pembacaan (optional)</ThemedText>
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
