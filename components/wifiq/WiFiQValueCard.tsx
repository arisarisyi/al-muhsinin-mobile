/**
 * WiFiQ Value Card Component
 *
 * Displays a single WiFiQ calculated value with its Arabic label
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { toArabicNumbers } from '@/utils/numbers';

interface WiFiQValueCardProps {
  /** Arabic label */
  label: string;
  /** Transliteration */
  transliteration?: string;
  /** Value to display */
  value: number;
}

export function WiFiQValueCard({
  label,
  transliteration,
  value,
}: WiFiQValueCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      {transliteration && (
        <Text style={[styles.transliteration, { color: colors.textTertiary }]}>
          {transliteration}
        </Text>
      )}
      <Text style={[styles.value, { color: colors.primary }]}>
        {toArabicNumbers(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadow.small,
  },
  label: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  transliteration: {
    ...Typography.caption,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  value: {
    ...Typography.arabic,
    textAlign: 'center',
  },
});
