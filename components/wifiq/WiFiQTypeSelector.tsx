/**
 * WiFiQ Type Selector Component
 *
 * Grid of cards to select from the 7 WiFiQ types
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { WiFiQ_TYPES } from '@/constants/WiFiQTypes';
import type { WiFiQType } from '@/types/wifiq.types';

interface WiFiQTypeSelectorProps {
  /** Currently selected type */
  selectedType?: WiFiQType;
  /** Callback when type is selected */
  onSelect?: (type: WiFiQType) => void;
}

export function WiFiQTypeSelector({ selectedType, onSelect }: WiFiQTypeSelectorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const types: WiFiQType[] = [
    'mutsalas',
    'murabba',
    'mukhamas',
    'musaddas',
    'musabba',
    'musamman',
    'mutassa',
  ];

  const handleTypePress = (type: WiFiQType) => {
    if (onSelect) {
      onSelect(type);
    } else {
      // Navigate to detail page
      router.push(`/wifiq/${type}`);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {types.map((type) => {
        const metadata = WiFiQ_TYPES[type];
        const isSelected = selectedType === type;

        return (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeCard,
              {
                backgroundColor: isSelected ? colors.primary : colors.surface,
                borderColor: isSelected ? colors.primary : colors.border,
              },
            ]}
            onPress={() => handleTypePress(type)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.colorIndicator,
                { backgroundColor: metadata.color },
              ]}
            />
            <Text
              style={[
                styles.typeName,
                { color: isSelected ? colors.surface : colors.text },
              ]}
            >
              {metadata.name}
            </Text>
            <Text
              style={[
                styles.typeSize,
                { color: isSelected ? colors.surface : colors.textSecondary },
              ]}
            >
              {metadata.size}
            </Text>
            <Text
              style={[
                styles.typeDetail,
                { color: isSelected ? colors.surface : colors.textTertiary },
              ]}
            >
              {metadata.day}
            </Text>
            <Text
              style={[
                styles.typeDetail,
                { color: isSelected ? colors.surface : colors.textTertiary },
              ]}
            >
              {metadata.planet}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  typeCard: {
    width: 140,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    ...Shadow.medium,
  },
  colorIndicator: {
    height: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  typeName: {
    ...Typography.arabic,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  typeSize: {
    ...Typography.heading3,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  typeDetail: {
    ...Typography.bodySmall,
    textAlign: 'center',
  },
});
