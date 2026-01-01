/**
 * WiFiQ Home Screen - Abajad Calculator
 *
 * Ported from santri-project AbajadCalculator
 * User inputs Arabic text, calculates Abajad values, shows WiFiQ results table
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { toArabicNumbers } from '@/utils/numbers';
import { calculateAbajad, calculateAllWifiqValues } from '@/utils/calculator';
import { WiFiQ_TYPES } from '@/constants/WiFiQTypes';
import type { WiFiQType, WiFiQValues } from '@/types/wifiq.types';

export default function WiFiQScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [calculationDetails, setCalculationDetails] = useState('');
  const [numericTotal, setNumericTotal] = useState(0);

  const calculateAbajadHandler = () => {
    if (!text.trim()) {
      setResult('Masukkan katanya Bolo');
      setCalculationDetails('');
      setNumericTotal(0);
      return;
    }

    const { total, details } = calculateAbajad(text);

    if (total > 0) {
      setResult(toArabicNumbers(total));
      setCalculationDetails(details);
      setNumericTotal(total);
    } else {
      setResult('');
      setCalculationDetails('لم يتم إدخال حروف عربية صالحة');
      setNumericTotal(0);
    }
  };

  const handleWiFiQPress = (type: WiFiQType, values: WiFiQValues) => {
    // Pass all WiFiQ values as query params
    router.push({
      pathname: '/wifiq/[type]',
      params: {
        type,
        miftah: values.miftah.toString(),
        maghlaq: values.maghlaq.toString(),
        adl: values.adl.toString(),
        tarh: values.tarh.toString(),
        wafaq: values.wafaq.toString(),
        masaha: values.masaha.toString(),
        dabit: values.dabit.toString(),
        ghayah: values.ghayah.toString(),
      },
    } as any);
  };

  const wifiqTypes: WiFiQType[] = [
    'mutsalas',
    'murabba',
    'mukhamas',
    'musaddas',
    'musabba',
    'musamman',
    'mutassa',
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <ThemedText style={styles.title} type="title">
            حاسبة حساب الجمل
          </ThemedText>
          <ThemedText style={styles.subtitle} type="subtitle">
            Kalkulator Abajad
          </ThemedText>
        </View>

        {/* Input Section */}
        <View style={styles.section}>
          <ThemedText type="heading3" style={styles.sectionTitle}>
            Masukkan Teks Arab
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
                textAlign: 'right',
              },
            ]}
            value={text}
            onChangeText={setText}
            placeholder="اكتب النص العربي هنا..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.calculateButton, { backgroundColor: colors.primary }]}
            onPress={calculateAbajadHandler}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.calculateButtonText}>
              حساب
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Result Display */}
        {result && (
          <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText type="heading2" style={styles.resultLabel}>
              Hasil:
            </ThemedText>
            <ThemedText style={[styles.resultValue, { color: colors.primary }]}>
              {result}
            </ThemedText>
            {calculationDetails && (
              <ThemedText style={styles.calculationDetails}>
                {calculationDetails}
              </ThemedText>
            )}
          </View>
        )}

        {/* WiFiQ Table */}
        {numericTotal > 0 && (
          <View style={styles.section}>
            <ThemedText type="heading2" style={styles.sectionTitle}>
              جدول الوفق والمفتاح
            </ThemedText>
            <ThemedText style={styles.tableSubtitle}>
              Tabel WiFiQ dan Miftah
            </ThemedText>

            {/* Scrollable Table with Header */}
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={[styles.tableHeader, { backgroundColor: colors.primary }]}>
                  <ThemedText style={styles.headerCell}>#</ThemedText>
                  <ThemedText style={styles.headerCell}>الوفق</ThemedText>
                  <ThemedText style={styles.headerCell}>المفتاح</ThemedText>
                  <ThemedText style={styles.headerCell}>المغلاق</ThemedText>
                  <ThemedText style={styles.headerCell}>العدل</ThemedText>
                  <ThemedText style={styles.headerCell}>الطرح</ThemedText>
                  <ThemedText style={styles.headerCell}>الوفق</ThemedText>
                  <ThemedText style={styles.headerCell}>مساحة</ThemedText>
                  <ThemedText style={styles.headerCell}>ضابط</ThemedText>
                  <ThemedText style={styles.headerCell}>غاية</ThemedText>
                </View>

                {/* Table Rows */}
                {wifiqTypes.map((type, index) => {
                  const metadata = WiFiQ_TYPES[type];
                  const values = calculateAllWifiqValues(numericTotal, type);
                  const isClickable = values.miftah !== 0 && values.miftah !== '-';

                  return (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.tableRow,
                        {
                          backgroundColor: isClickable ? colors.surface : colors.background,
                          borderColor: colors.border,
                        },
                      ]}
                      onPress={() => isClickable && handleWiFiQPress(type, values)}
                      disabled={!isClickable}
                      activeOpacity={0.7}
                    >
                      <ThemedText style={styles.rowCell}>
                        {toArabicNumbers(index + 1)}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {metadata.name}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {values.miftah === 0 || values.miftah === '-'
                          ? '-'
                          : toArabicNumbers(values.miftah)}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.maghlaq === 'number' && values.maghlaq !== 0
                          ? toArabicNumbers(values.maghlaq)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.adl === 'number' && values.adl !== 0
                          ? toArabicNumbers(values.adl)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.tarh === 'number' && values.tarh !== 0
                          ? toArabicNumbers(values.tarh)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.wafaq === 'number' && values.wafaq !== 0
                          ? toArabicNumbers(values.wafaq)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.masaha === 'number' && values.masaha !== 0
                          ? toArabicNumbers(values.masaha)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.dabit === 'number' && values.dabit !== 0
                          ? toArabicNumbers(values.dabit)
                          : '-'}
                      </ThemedText>
                      <ThemedText style={styles.rowCell}>
                        {typeof values.ghayah === 'number' && values.ghayah !== 0
                          ? toArabicNumbers(values.ghayah)
                          : '-'}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
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
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  tableSubtitle: {
    ...Typography.body,
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: 18,
    minHeight: 120,
    marginBottom: Spacing.md,
    fontFamily: 'System',
  },
  calculateButton: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  calculateButtonText: {
    ...Typography.heading3,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  resultLabel: {
    marginBottom: Spacing.sm,
  },
  resultValue: {
    ...Typography.arabicLarge,
    marginBottom: Spacing.sm,
  },
  calculationDetails: {
    ...Typography.body,
    fontStyle: 'italic',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  headerCell: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    width: 70,
    marginHorizontal: 2,
  },
  tableContainer: {
    paddingBottom: Spacing.md,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    alignItems: 'center',
    minWidth: 700,
  },
  rowCell: {
    ...Typography.bodySmall,
    textAlign: 'center',
    width: 70,
    marginHorizontal: 2,
  },
});

