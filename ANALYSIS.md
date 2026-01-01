# Analisis & Keputusan Teknis - Santri Apps

## 1. Analisis Backend WiFiQ

### Struktur Data yang Sudah Ada
Dari analisis `/santri-project`, backend WiFiQ sudah memiliki struktur data yang lengkap:

**Tipe WiFiQ (7 jenis):**
1. **Mutsalas** (مُثَلَّث) - 3×3 - Sabtu - Saturn (الزحل)
2. **Murabba** (مُرَبَّع) - 4×4 - Rabu - Mercury (العطارد)
3. **Mukhamas** (مُخَمَّس) - 5×5 - Selasa - Mars (المريح)
4. **Musaddas** (مُسَدَّس) - 6×6 - Minggu - Sun (الشمس)
5. **Musabba** (مُسَبَّع) - 7×7 - Jumat - Venus (الزحرة)
6. **Musamman** (مُثَمَّن) - 8×8 - Kamis - Jupiter (المشترى)
7. **Mutassa** (مُتسع) - 9×9 - Senin - Moon (القمر)

**Nilai yang Dihitung:**
- Miftah (المفتاح) - Key
- Maghlaq (المغلاق) - Lock
- Adl (العدل) - Justice
- Tarh (الطرح) - Subtraction
- Wafaq (الوفق) - Concord
- Masaha (المساحة) - Area
- Dabit (الضابط) - Controller
- Ghayah (الغاية) - Goal

**Komponen Pendukung:**
- Tabel jam planet (siang & malam)
- Nama-nama malaikat
- Malaikat Sufliyyah

---

## 2. Pilihan Teknologi

### Expo vs React Native CLI

**Keputusan: Menggunakan Expo** ✅

**Alasan:**
1. ✅ **Stabilitas & Maintenance**: Expo SDK 54 sudah sangat stabil dan production-ready
2. ✅ **Over-the-Air Updates**: Memudahkan update tanpa republish ke app store
3. ✅ **Expo Router**: File-based routing yang sudah ter-setup di project
4. ✅ **Cross-platform**: Android, iOS, dan Web dari satu codebase
5. ✅ **Development Experience**: Faster development dengan tooling lengkap
6. ✅ **Komunitas**: Documentation dan komunitas yang besar
7. ✅ **Native Modules**: Akses ke native modules ketika dibutuhkan

**Kapan perlu beralih ke CLI:**
- Jika butuh custom native modules yang tidak tersedia di Expo
- Jika ukurran app menjadi sangat besar (100MB+)
- Untuk use case saat ini, Expo sudah lebih dari cukup

---

## 3. Arsitektur Project

### Struktur Folder (Clean Architecture)

```
santri-apps/
├── app/                      # Expo Router (file-based routing)
│   ├── (tabs)/              # Bottom tab navigation
│   │   ├── _layout.tsx      # Tab layout configuration
│   │   ├── index.tsx        # Home screen
│   │   ├── wifiq.tsx        # WiFiQ screen
│   │   ├── ratib.tsx        # Ratib Al-Haddad (future)
│   │   └── doa.tsx          # Doa-doa (future)
│   ├── wifiq/               # WiFiQ detail routes
│   │   ├── [type].tsx       # Dynamic route untuk WiFiQ types
│   │   └── _layout.tsx
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal template
├── components/              # Reusable components
│   ├── ui/                 # Base UI components
│   ├── wifiq/              # WiFiQ-specific components
│   │   ├── WifiqHeader.tsx
│   │   ├── ValueCard.tsx
│   │   ├── PlanetaryHoursTable.tsx
│   │   └── AngelNamesDisplay.tsx
│   └── common/             # Shared components
├── constants/              # App constants
│   ├── Colors.ts          # Color palette
│   ├── WiFiQTypes.ts      # WiFiQ type definitions
│   └── ArabicNumbers.ts   # Arabic number utilities
├── hooks/                  # Custom hooks
│   ├── use-color-scheme.ts
│   └── use-wifiq-calculator.ts
├── utils/                  # Utility functions
│   ├── numbers.ts         # Number conversion utilities
│   └── calculator.ts      # WiFiQ calculation logic
├── types/                  # TypeScript type definitions
│   ├── wifiq.types.ts
│   └── common.types.ts
├── assets/                 # Static assets
│   ├── images/
│   └── fonts/             # Arabic & Latin fonts
└── theme/                  # Theme configuration
    ├── light.ts           # Light theme colors
    ├── dark.ts            # Dark theme colors
    └── index.ts           # Theme exports
```

---

## 4. Navigation Strategy

### Bottom Tabs vs Drawer

**Keputusan: Bottom Tabs Navigation** ✅

**Alasan Bottom Tabs:**
1. ✅ **Accessibility**: Lebih mudah dijangkau dengan satu thumb (mobile-first)
2. ✅ **Discoverability**: User langsung melihat semua menu utama
3. ✅ **Pattern Familiar**: Umum digunakan di Islamic & educational apps
4. ✅ **Performance**: Lebih ringan daripada drawer navigation
5. ✅ **Fit Terbatas**: Hanya 3-4 menu utama, cocok untuk bottom tabs

**Struktur Tabs:**
```
┌─────────────────────────────────┐
│                                 │
│         Content Area            │
│                                 │
├─────────────────────────────────┤
│ 🏠 WiFiQ  📖 Ratib  🤲 Doa    │
└─────────────────────────────────┘
```

**Menu:**
1. **WiFiQ** (首页/Home) - Fitur utama saat ini
2. **Ratib** (Coming Soon) - Ratib Al-Haddad
3. **Doa** (Coming Soon) - Kumpulan doa dari PDF

---

## 5. State Management

### Context vs Zustand

**Keputusan: React Context + Hooks** ✅

**Alasan:**
1. ✅ **Built-in**: Tidak perlu dependency tambahan
2. ✅ **Skala Kecil**: Untuk app ini, Context sudah cukup
3. ✅ **TypeScript Support**: Mudah di-type dengan TypeScript
4. ✅ **Learning Curve**: Tim baru lebih mudah memahami Context

**Kapan perlu Zustand:**
- Jika state menjadi kompleks dengan banyak nested objects
- Jika butuh performance optimization untuk frequent updates
- Jika ada banyak state yang terpisah-pisah

**State yang Dikelola:**
- Theme (light/dark mode)
- User preferences
- WiFiQ calculation results (jika perlu caching)

---

## 6. Design System - Islamic UI/UX

### Color Palette

**Light Mode (Soft Islamic Colors):**
```typescript
{
  primary: '#2D5A3D',      // Deep green - Islami & natural
  secondary: '#8B7355',    // Earth tone - Grounded
  accent: '#D4AF37',       // Gold - Elegance & precious
  background: '#FAF9F6',   // Off-white - Cream paper
  surface: '#FFFFFF',      // Pure white - Cards
  text: '#2C3333',         // Dark gray - High readability
  textSecondary: '#6B7280', // Medium gray - Secondary text
  border: '#E5E7EB',       // Light gray - Subtle borders
  error: '#DC2626',        // Red - Error states
  success: '#059669',      // Green - Success
}
```

**Dark Mode (Easy on Eyes):**
```typescript
{
  primary: '#4A7C59',      // Lighter green - Dark mode
  secondary: '#A4916E',    // Lighter earth tone
  accent: '#E5C158',       // Lighter gold
  background: '#1A1A1A',   // Near black - OLED friendly
  surface: '#2D2D2D',      // Dark gray - Cards
  text: '#F9FAFB',         // Near white - Primary text
  textSecondary: '#D1D5DB', // Light gray - Secondary text
  border: '#374151',       // Medium gray - Borders
  error: '#F87171',        // Light red - Error
  success: '#34D399',      // Light green - Success
}
```

### Typography

**Font Families:**
- **Arabic**: `Amiri` atau `Scheherazade` - Traditional & readable
- **Latin**: `Inter` atau `Poppins` - Modern & clean

**Type Scale:**
```typescript
{
  heading1: { fontSize: 32, lineHeight: 40, fontWeight: 'bold' },
  heading2: { fontSize: 24, lineHeight: 32, fontWeight: 'semibold' },
  heading3: { fontSize: 20, lineHeight: 28, fontWeight: 'semibold' },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: 'normal' },
  body: { fontSize: 14, lineHeight: 20, fontWeight: 'normal' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: 'normal' },
}
```

### Spacing System

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

### Component Style Guidelines

1. **Cards**: Rounded corners (12px), subtle shadow
2. **Buttons**: Pill-shaped (24px corners), ripple effect
3. **Inputs**: 8px corners, clear focus states
4. **Scroll**: Smooth scrolling, momentum scroll enabled
5. **RTL Support**: Right-to-left layout untuk Arabic text

---

## 7. WiFiQ Screen Requirements

### Halaman WiFiQ (Home)

**Components:**
1. **Header Section**
   - Judul "وفق" (WiFiQ)
   - Subjudul singkat tentang WiFiQ

2. **WiFiQ Type Selector**
   - Grid/List pilihan 7 jenis WiFiQ
   - Setiap item: nama Arab, ukuran, hari, planet
   - Color-coded sesuai jenis

3. **Content Display** (ketika type dipilih)
   - Judul dengan detail type
   - 8 Value cards (Miftah, Maghlaq, dll)
   - Tabel jam planet (siang & malam)
   - Nama-nama malaikat
   - Malaikat Sufliyyah

**User Flow:**
1. User membuka app → langsung di WiFiQ screen
2. User melihat list 7 jenis WiFiQ
3. User taps salah satu type
4. Scrollable content dengan semua informasi
5. Smooth scroll experience

---

## 8. Scalability Plan

### Fitur Future: Ratib Al-Haddad

**Persiapan Arsitektur:**
- ✅ Tab navigation sudah siap untuk tambah menu
- ✅ Theme system bisa digunakan semua screen
- ✅ Component structure reusable untuk text content

**Kebutuhan:**
- Text content dengan Arabic font
- Audio player (future)
- Bookmark & favorite (future)

### Fitur Future: Doa-doa dari PDF

**Persiapan Arsitektur:**
- ✅ Modular components untuk PDF integration
- ✅ Navigation bisa handle complex routes

**Kebutuhan:**
- PDF reader library (react-native-pdf atau expo-pdf)
- PDF asset management
- Search/Filter doa (future)

**Implementasi Plan:**
1. Setup PDF library
2. Create PDF viewer component
3. Integrate dengan navigation
4. Add bookmarks & notes (future)

---

## 9. Implementation Priorities

### Phase 1: Foundation (Current)
- ✅ Setup Expo project
- 🔄 Implement theme system (light/dark)
- 🔄 Create navigation structure
- 🔄 Build WiFiQ type definitions

### Phase 2: WiFiQ Core
- 📋 Build WiFiQ calculator logic
- 📋 Create WiFiQ screen UI
- 📋 Implement value cards component
- 📋 Build planetary hours table
- 📋 Add angel names display

### Phase 3: Polish
- 📋 Add RTL support
- 📋 Optimize scrolling performance
- 📋 Test on both iOS & Android
- 📋 Accessibility audit

### Phase 4: Future Features
- 📋 Ratib Al-Haddad
- 📋 Doa-doa PDF integration
- 📋 Audio player (if needed)

---

## 10. Quality Standards

### Code Quality
- ✅ TypeScript strict mode
- ✅ No `any` types - gunakan interfaces/types
- ✅ Component separation (logic vs presentation)
- ✅ Reusable components
- ✅ Clear naming conventions

### UI/UX Quality
- ✅ Smooth animations (60fps)
- ✅ Proper spacing & hierarchy
- ✅ Readable typography
- ✅ Accessible touch targets (min 44px)
- ✅ Proper RTL support

### Performance
- ✅ Optimize re-renders
- ✅ Memoize expensive calculations
- ✅ Lazy loading untuk fitur future
- ✅ Efficient scrolling dengan FlatList

---

## Summary

✅ **Expo** dipilih untuk stabilitas & development speed
✅ **Bottom Tabs** untuk accessibility & discoverability
✅ **Context API** untuk state management (cukup untuk skala ini)
✅ **Islamic Design System** dengan warna hijau tua, emas, dan earth tones
✅ **Clean Architecture** dengan separation of concerns
✅ **Scalable Structure** siap untuk Ratib & Doa-doa fitur

Next: Implement theme system & WiFiQ screen! 🚀
