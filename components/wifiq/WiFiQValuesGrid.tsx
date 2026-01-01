/**
 * WiFiQ Values Grid Component
 *
 * Grid display of all 8 calculated WiFiQ values
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { WiFiQValueCard } from './WiFiQValueCard';
import { WIFIQ_VALUE_LABELS } from '@/constants/WiFiQTypes';
import type { WiFiQValues } from '@/types/wifiq.types';

interface WiFiQValuesGridProps {
  /** Calculated WiFiQ values */
  values: WiFiQValues;
}

export function WiFiQValuesGrid({ values }: WiFiQValuesGridProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const valueKeys = Object.keys(values) as Array<keyof WiFiQValues>;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      {valueKeys.map((key) => {
        const labelData = WIFIQ_VALUE_LABELS[key];
        return (
          <View key={key} style={styles.cardWrapper}>
            <WiFiQValueCard
              label={labelData.arabic}
              transliteration={labelData.transliteration}
              value={values[key]}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  cardWrapper: {
    width: 120,
    marginRight: Spacing.md,
  },
});
