/**
 * Welcome Screen / Splash Screen
 *
 * Al-Muhsinin branding with:
 * - Logo animation
 * - Quran verse
 * - Animated features
 * - Get Started button
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [showContent, setShowContent] = useState(false);

  // Features for auto-rotating display
  const features = [
    { icon: '🕌', text: 'Sholat Jamaah' },
    { icon: '📚', text: 'Pengajian Kitab Kuning' },
    { icon: '📖', text: '1 Day 1 Juz' },
    { icon: '✨', text: 'Ilmu Hikmah' },
    { icon: '💼', text: 'Kewirausahaan' },
  ];
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    // Initial animations
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();

    // Show content after animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    // Auto-rotate features
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  const handleGetStarted = async () => {
    // For now, just navigate (no AsyncStorage check)
    router.replace('/(tabs)');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternDot, { top: '10%', left: '20%' }]} />
        <View style={[styles.patternDot, { top: '30%', right: '15%' }]} />
        <View style={[styles.patternDot, { bottom: '40%', left: '10%' }]} />
        <View style={[styles.patternDot, { bottom: '20%', right: '25%' }]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image
            source={require('@/assets/images/al-muhsinin.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Pesantren Modern untuk Mahasiswa
          </Text>
        </Animated.View>

        {/* Main Title */}
        <Animated.View
          style={[
            styles.titleSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Pondok Pesantren Kreatif</Text>
          <Text style={[styles.subtitle, { color: colors.primary }]}>
            Al-Muhsinin
          </Text>
        </Animated.View>

        {/* Quran Verse Card */}
        {showContent && (
          <Animated.View
            style={[
              styles.verseCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={[styles.verseArabic, { color: colors.primary }]}>
              إِنَّ رَحْمَتَ ٱللَّهِ قَرِيبٌ مِّنَ ٱلْمُحْسِنِينَ
            </Text>
            <Text style={[styles.verseTranslation, { color: colors.textSecondary }]}>
              "Sesungguhnya rahmat Allah amat dekat kepada orang-orang yang berbuat baik."
            </Text>
            <Text style={[styles.verseSource, { color: colors.textTertiary }]}>
              (QS. Al-A'raf: 56)
            </Text>
          </Animated.View>
        )}

        {/* Animated Features */}
        {showContent && (
          <Animated.View
            style={[
              styles.featuresSection,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.featuresLabel}>Kegiatan Unggulan:</Text>
            <View style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={styles.featureIcon}>{features[currentFeature].icon}</Text>
              <Text style={[styles.featureText, { color: colors.primary }]}>
                {features[currentFeature].text}
              </Text>
            </View>

            {/* Feature Indicators */}
            <View style={styles.featureIndicators}>
              {features.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor: index === currentFeature
                        ? colors.primary
                        : colors.border,
                      width: index === currentFeature ? 24 : 8,
                    },
                  ]}
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Stats */}
        {showContent && (
          <Animated.View
            style={[
              styles.statsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>2014</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tahun Berdiri</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>40+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Santri Aktif</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>200+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Alumni</Text>
            </View>
          </Animated.View>
        )}

        {/* Get Started Button */}
        {showContent && (
          <Animated.View style={[styles.buttonSection, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={[styles.getStartedButton, { backgroundColor: colors.primary }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.getStartedText}>Mulai Sekarang</Text>
            </TouchableOpacity>
            <Text style={[styles.skipText, { color: colors.textTertiary }]} onPress={handleGetStarted}>
              Lewati
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textTertiary }]}>
          Cukir, Diwek, Jombang
        </Text>
        <Text style={[styles.footerText, { color: colors.textTertiary }]}>
          © Al-Muhsinin {new Date().getFullYear()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    minHeight: height,
    justifyContent: 'center',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  patternDot: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(13, 148, 144, 0.03)',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xl,
    zIndex: 1,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: Spacing.lg,
  },
  tagline: {
    ...Typography.body,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.heading1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.heading2,
    textAlign: 'center',
    fontWeight: '700',
  },
  verseCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderLeftWidth: 6,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verseArabic: {
    ...Typography.arabic,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 32,
  },
  verseTranslation: {
    ...Typography.body,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  verseSource: {
    ...Typography.bodySmall,
    textAlign: 'center',
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  featuresLabel: {
    ...Typography.body,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  featureCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 250,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  featureText: {
    ...Typography.heading3,
    fontWeight: '700',
  },
  featureIndicators: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.heading3,
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    textAlign: 'center',
  },
  buttonSection: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  getStartedButton: {
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedText: {
    ...Typography.heading3,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  skipText: {
    ...Typography.body,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
});
