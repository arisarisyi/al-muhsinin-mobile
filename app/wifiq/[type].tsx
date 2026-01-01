/**
 * WiFiQ Detail Screen
 *
 * Displays detailed WiFiQ information including:
 * - Header with type info
 * - All 8 calculated values
 * - Planetary hours tables
 * - Angel names
 * - Sufliyyah angels
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { toArabicNumbers } from '@/utils/numbers';
import { generateAngelName, generateSufliyyahAngelName } from '@/utils/calculator';
import { WiFiQ_TYPES } from '@/constants/WiFiQTypes';
import type { WiFiQType } from '@/types/wifiq.types';

export default function WiFiQDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Get params from navigation
  const params = useLocalSearchParams();
  const type = params.type as WiFiQType;
  const metadata = WiFiQ_TYPES[type];

  // Parse WiFiQ values from params
  const wifiqValues = {
    miftah: params.miftah === '-' ? '-' : parseFloat(params.miftah as string),
    maghlaq: params.maghlaq === '-' ? '-' : parseFloat(params.maghlaq as string),
    adl: params.adl === '-' ? '-' : parseFloat(params.adl as string),
    tarh: params.tarh === '-' ? '-' : parseFloat(params.tarh as string),
    wafaq: params.wafaq === '-' ? '-' : parseFloat(params.wafaq as string),
    masaha: params.masaha === '-' ? '-' : parseFloat(params.masaha as string),
    dabit: params.dabit === '-' ? '-' : parseFloat(params.dabit as string),
    ghayah: params.ghayah === '-' ? '-' : parseFloat(params.ghayah as string),
  };

  // Complete planetary hours data (port from santri-project)
  const nightHours = [
    ['المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', '٦-٧'],
    ['الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', '٧-٨'],
    ['الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', '٨-٩'],
    ['العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', '٩-١٠'],
    ['القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', '١٠-١١'],
    ['الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', '١١-١٢'],
    ['المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', '١٢-١'],
    ['المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', '١-٢'],
    ['الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', '٢-٣'],
    ['الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', '٣-٤'],
    ['العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', '٤-٥'],
    ['القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', '٥-٦'],
  ];

  const dayHours = [
    ['الزحل', 'الزحرة', 'القمر', 'العطارد', 'المريخ', 'القمر', 'الشمس', '٦-٧'],
    ['المشترى', 'العطارد', 'الزحل', 'القمر', 'الشمس', 'الزحل', 'الزحرة', '٧-٨'],
    ['المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', '٨-٩'],
    ['الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', '٩-١٠'],
    ['الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', '١٠-١١'],
    ['العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', '١١-١٢'],
    ['القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', '١٢-١'],
    ['الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', '١-٢'],
    ['المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', '٢-٣'],
    ['المريخ', 'القمر', 'الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', '٣-٤'],
    ['الشمس', 'الزحل', 'الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', '٤-٥'],
    ['الزحرة', 'المشترى', 'العطارد', 'المريخ', 'القمر', 'الشمس', 'الزحل', '٥-٦'],
  ];

  // Headers for planetary hours table
  const planetaryHeaders = [
    'السبت',
    'الجمعة',
    'الخميس',
    'الربعاء',
    'الثلاثاء',
    'الاثنين',
    'الأحد',
    'الساعة',
  ];

  // Day index mapping for highlighting
  const dayIndexMap: Record<string, number> = {
    'السبت': 0,
    'الجمعة': 1,
    'الخميس': 2,
    'الربعاء': 3,
    'الثلاثاء': 4,
    'الاثنين': 5,
    'الأحد': 6,
  };

  const targetDayIndex = dayIndexMap[metadata.day] || 0;
  const timeColIndex = planetaryHeaders.length - 1;

  // Angel data
  const angels = [
    { name: 'الملاك الأول', source: 'المفتاح', value: wifiqValues.miftah },
    { name: 'الملاك الثاني', source: 'المغلاق', value: wifiqValues.maghlaq },
    { name: 'الملاك الثالث', source: 'العدل', value: wifiqValues.adl },
    { name: 'الملاك الرابع', source: 'الوفق', value: wifiqValues.wafaq },
    { name: 'الملاك الخامس', source: 'المساحة', value: wifiqValues.masaha },
    { name: 'الملاك السادس', source: 'الضابط', value: wifiqValues.dabit },
    { name: 'الملاك السابع', source: 'الغاية', value: wifiqValues.ghayah },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: metadata.color }]}>
        <ThemedText style={styles.title} type="title">
          وفق {metadata.name}
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          {metadata.size} - {metadata.day}
        </ThemedText>
        <ThemedText style={styles.planet}>
          {metadata.planet}
        </ThemedText>
      </View>

      {/* WiFiQ Values */}
      <View style={styles.section}>
        <ThemedText type="heading2" style={styles.sectionTitle}>
          القيم المحسوبة
        </ThemedText>
        <ThemedText style={styles.sectionSubtitle}>
          Nilai-nilai yang Dihitung
        </ThemedText>

        <View style={[styles.valuesGrid, { borderColor: colors.border }]}>
          <ValueCard label="المفتاح" transliteration="Al-Miftah" value={wifiqValues.miftah} />
          <ValueCard label="المغلاق" transliteration="Al-Maghlaq" value={wifiqValues.maghlaq} />
          <ValueCard label="العدل" transliteration="Al-Adl" value={wifiqValues.adl} />
          <ValueCard label="الطرح" transliteration="Al-Tarh" value={wifiqValues.tarh} />
          <ValueCard label="الوفق" transliteration="Al-Wafaq" value={wifiqValues.wafaq} />
          <ValueCard label="المساحة" transliteration="Al-Masaha" value={wifiqValues.masaha} />
          <ValueCard label="الضابط" transliteration="Al-Dabit" value={wifiqValues.dabit} />
          <ValueCard label="الغاية" transliteration="Al-Ghayah" value={wifiqValues.ghayah} />
        </View>
      </View>

      {/* Planetary Hours */}
      <View style={styles.section}>
        <ThemedText type="heading2" style={styles.sectionTitle}>
          ساعات الكواكب
        </ThemedText>
        <ThemedText style={styles.explanation}>
          Jam-jam planet untuk hari {metadata.day}
        </ThemedText>

        <ThemedText style={styles.tableTitle}>الليل (Malam)</ThemedText>
        <PlanetaryHoursTable
          hours={nightHours}
          headers={planetaryHeaders}
          targetPlanet={metadata.planet}
          targetDayIndex={targetDayIndex}
          typeColor={metadata.color}
          timeColIndex={timeColIndex}
        />

        <ThemedText style={styles.tableTitle}>النهار (Siang)</ThemedText>
        <PlanetaryHoursTable
          hours={dayHours}
          headers={planetaryHeaders}
          targetPlanet={metadata.planet}
          targetDayIndex={targetDayIndex}
          typeColor={metadata.color}
          timeColIndex={timeColIndex}
        />
      </View>

      {/* Angel Names */}
      <View style={styles.section}>
        <ThemedText type="heading2" style={styles.sectionTitle}>
          أسماء الملائكة الروحانية
        </ThemedText>
        <ThemedText style={styles.explanation}>
          Nama-nama malaikat rohani untuk kebaikan
        </ThemedText>

        {angels.map((angel, index) => (
          <View key={index} style={[styles.angelCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText style={styles.angelName}>{angel.name}</ThemedText>
            <ThemedText style={styles.angelSource}>
              من {angel.source}: <Text style={styles.angelValue}>{toArabicNumbers(angel.value)}</Text>
            </ThemedText>
            <ThemedText style={[styles.angelGeneratedName, { color: colors.primary }]}>
              {generateAngelName(angel.value)}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Sufliyyah Angels */}
      <View style={styles.section}>
        <ThemedText type="heading2" style={[styles.sectionTitle, { color: colors.error }]}>
          أسماء الملائكة للحاجات غير الطيبة
        </ThemedText>
        <ThemedText style={[styles.warning, { color: colors.error }]}>
          تحذير: هذه الأسماء للعلم فقط
        </ThemedText>

        {angels.map((angel, index) => (
          <View key={index} style={[styles.angelCard, styles.evilCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText style={styles.angelName}>{angel.name}</ThemedText>
            <ThemedText style={styles.angelSource}>
              من {angel.source}: <Text style={styles.angelValue}>{toArabicNumbers(angel.value)}</Text>
            </ThemedText>
            <ThemedText style={[styles.angelGeneratedName, { color: colors.error }]}>
              {generateSufliyyahAngelName(angel.value)}
            </ThemedText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Value Card Component
function ValueCard({
  label,
  transliteration,
  value,
}: {
  label: string;
  transliteration: string;
  value: number | '-' | string;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.valueCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <ThemedText style={styles.valueLabel}>{label}</ThemedText>
      <ThemedText style={styles.valueTransliteration}>{transliteration}</ThemedText>
      <ThemedText style={[styles.valueNumber, { color: colors.primary }]}>
        {typeof value === 'number' ? toArabicNumbers(value) : '-'}
      </ThemedText>
    </View>
  );
}

// Planetary Hours Table Component
function PlanetaryHoursTable({
  hours,
  headers,
  targetPlanet,
  targetDayIndex,
  typeColor,
  timeColIndex,
}: {
  hours: string[][];
  headers: string[];
  targetPlanet: string;
  targetDayIndex: number;
  typeColor: string;
  timeColIndex: number;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const h = hex.replace('#', '');
    const full = h.length === 3
      ? h.split('').map((c) => c + c).join('')
      : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={styles.tableWrapper}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          {headers.map((header, index) => (
            <View
              key={index}
              style={[
                styles.tableCellHeader,
                { backgroundColor: typeColor },
              ]}
            >
              <ThemedText style={styles.tableHeaderText}>{header}</ThemedText>
            </View>
          ))}
        </View>

        {/* Table Rows */}
        {hours.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            {row.map((cell, cellIndex) => {
              // Skip highlighting for time column
              if (cellIndex === timeColIndex) {
                return (
                  <View
                    key={cellIndex}
                    style={[
                      styles.tableCell,
                      styles.tableCellTime,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                  >
                    <ThemedText style={styles.tableCellText}>{cell}</ThemedText>
                  </View>
                );
              }

              // Check if this cell should be highlighted
              const isPlanet = cell === targetPlanet;
              const isPrimary = isPlanet && cellIndex === targetDayIndex;

              let cellStyle: any = {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              };
              let textStyle = {};

              if (isPrimary) {
                // Primary highlight: full color with white text
                cellStyle = {
                  backgroundColor: typeColor,
                  borderColor: typeColor,
                };
                textStyle = { color: '#FFFFFF', fontWeight: '600' };
              } else if (isPlanet) {
                // Planet highlight: light transparent background
                cellStyle = {
                  backgroundColor: hexToRgba(typeColor, 0.18),
                  borderColor: hexToRgba(typeColor, 0.3),
                };
              }

              return (
                <View
                  key={cellIndex}
                  style={[styles.tableCell, cellStyle]}
                >
                  <ThemedText style={[styles.tableCellText, textStyle]}>{cell}</ThemedText>
                </View>
              );
            })}
          </View>
        ))}
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
  planet: {
    ...Typography.body,
    color: '#FFFFFF',
  },
  section: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    ...Typography.body,
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },
  explanation: {
    ...Typography.body,
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },
  tableTitle: {
    ...Typography.heading3,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  warning: {
    ...Typography.body,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
  },
  valueCard: {
    width: '47%',
    margin: '1%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  valueLabel: {
    ...Typography.arabic,
    marginBottom: Spacing.xs,
  },
  valueTransliteration: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  valueNumber: {
    ...Typography.arabic,
  },
  tableWrapper: {
    paddingBottom: Spacing.md,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  tableCell: {
    width: 80,
    padding: Spacing.sm,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  tableCellHeader: {
    width: 80,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  tableCellTime: {
    borderStyle: 'dashed',
  },
  tableHeaderText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tableCellText: {
    ...Typography.bodySmall,
  },
  angelCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  evilCard: {
    borderStyle: 'dashed',
  },
  angelName: {
    ...Typography.heading4,
    marginBottom: Spacing.xs,
  },
  angelSource: {
    ...Typography.body,
    marginBottom: Spacing.sm,
  },
  angelValue: {
    ...Typography.arabic,
  },
  angelGeneratedName: {
    ...Typography.arabicLarge,
    marginTop: Spacing.sm,
  },
});
