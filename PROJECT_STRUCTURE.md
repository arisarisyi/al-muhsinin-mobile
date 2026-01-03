# Santri Apps - Project Structure

## Overview
Aplikasi santri untuk doa, hizib, ratib, dan kalkulasi WiFiQ menggunakan React Native dengan Expo Router.

---

## 📁 Directory Structure

```
santri-apps/
├── app/                          # Expo Router pages (File-based routing)
│   ├── _layout.tsx              # Root layout dengan Stack navigator
│   ├── welcome.tsx              # Welcome/onboarding screen
│   ├── modal.tsx                # Modal presentation
│   │
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Home tab
│   │   ├── doa.tsx              # Doa & Hizib list tab ⭐
│   │   ├── ratib.tsx            # Ratib tab
│   │   └── explore.tsx          # Explore tab
│   │
│   ├── doa/                     # Doa detail pages
│   │   └── [id].tsx             # Dynamic doa detail page ⭐
│   │
│   └── wifiq/                   # WiFiQ calculation pages
│       └── [type].tsx           # Dynamic WiFiQ type page
│
├── components/                   # Reusable React components
│   ├── themed-text.tsx          # Text component with theme support
│   ├── themed-view.tsx          # View component with theme support
│   ├── external-link.tsx        # External link component
│   ├── haptic-tab.tsx           # Tab with haptic feedback
│   ├── hello-wave.tsx           # Demo component
│   ├── parallax-scroll-view.tsx # Scroll view with parallax effect
│   │
│   ├── ui/                      # UI components
│   │   ├── icon-symbol.tsx      # Icon wrapper component
│   │   ├── icon-symbol.ios.tsx  # iOS-specific icons
│   │   └── collapsible.tsx      # Collapsible/accordion
│   │
│   └── wifiq/                   # WiFiQ specific components
│       ├── WiFiQTypeSelector.tsx   # Type selector
│       ├── WiFiQValueCard.tsx      # Value display card
│       └── WiFiQValuesGrid.tsx     # Values grid layout
│
├── constants/                    # Application constants & data
│   ├── theme.ts                 # Theme system (colors, typography, spacing) ⭐
│   ├── DoaList.ts              # Doa/hizib data list ⭐
│   ├── WiFiQTypes.ts           # WiFiQ type definitions
│   └── surah-and-ayat.ts       # Surah & ayat data
│
├── types/                        # TypeScript type definitions
│   ├── doa.types.ts            # Doa-related types ⭐
│   └── wifiq.types.ts          # WiFiQ-related types
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts     # Dark/light mode hook
│   ├── use-color-scheme.web.ts # Web version of color scheme
│   └── use-theme-color.ts      # Theme color hook
│
├── utils/                        # Utility functions
│   ├── calculator.ts           # WiFiQ calculation utilities
│   └── numbers.ts              # Number formatting utilities
│
├── assets/                       # Static assets
│   ├── images/                 # App images & icons
│   │   ├── icon.png
│   │   ├── splash-icon.png
│   │   ├── al-muhsinin.png
│   │   └── android-*.png       # Android icons
│   │
│   └── pdf/                    # PDF files
│       ├── Jaljalut-kubro.pdf
│       ├── Jaljalut-sughro.pdf
│       └── ratib.pdf
│
├── scripts/                      # Build & utility scripts
│   └── reset-project.js        # Project reset script
│
├── .vscode/                      # VS Code settings
│   ├── settings.json           # Editor configuration
│   └── extensions.json         # Recommended extensions
│
├── app.json                     # Expo app configuration
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 🎯 Core Features & Routes

### 1. **Doa & Hizib Feature** ⭐
**Location**: `app/(tabs)/doa.tsx` & `app/doa/[id].tsx`

**Routes:**
- `/doa` - List doa dengan search & filter
- `/doa/:id` - Detail doa dengan teks Arab, transliterasi, terjemahan

**Files:**
- `app/(tabs)/doa.tsx` - List screen
- `app/doa/[id].tsx` - Detail screen
- `constants/DoaList.ts` - Data doa (16 items)
- `types/doa.types.ts` - Type definitions

**Categories:**
- `amalan` - Amalan harian (Surat Al-Mulk, Al-Kahfi, dll)
- `hizib` - Hizib & Wirid (Jailani, Nawawi, Bahr, dll)
- `doa_harian` - Doa harian (pagi, petang, tidur)
- `rawatib` - Rawatib & doa mustajab (Jaljalut, dll)

---

### 2. **WiFiQ Calculator**
**Location**: `app/wifiq/[type].tsx`

**Routes:**
- `/wifiq/:type` - Calculate WiFiQ values by type

**Types:**
- `mutsalas` (3) - Sabtu/Saturn
- `murabba` (4) - Rabu/Mercury
- `mukhamas` (5) - Selasa/Mars
- `musaddas` (6) - Minggu/Sun
- `musabba` (7) - Jumat/Venus
- `musamman` (8) - Kamis/Jupiter
- `mutassa` (9) - Senin/Moon

---

### 3. **Ratib**
**Location**: `app/(tabs)/ratib.tsx`

**Features:**
- PDF viewer untuk ratib
- Download ratib PDFs

---

### 4. **Explore**
**Location**: `app/(tabs)/explore.tsx`

**Features:**
- Exploration & discovery features

---

## 🎨 Theme System

**Location**: `constants/theme.ts`

### Color Palette (Light Mode)
```typescript
{
  primary: '#2D5A3D',        // Deep green
  primaryLight: '#3D7A52',
  secondary: '#8B7355',      // Earth tone
  accent: '#D4AF37',         // Gold
  background: '#FAF9F6',     // Off-white
  surface: '#FFFFFF',
  text: '#2C3333',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
}
```

### Typography Scale
```typescript
- Heading 1: 32px
- Heading 2: 24px
- Heading 3: 20px
- Heading 4: 18px
- Body Large: 16px
- Body: 14px
- Body Small: 12px
- Arabic Large: 28px (lineHeight: 44)
- Arabic: 24px (lineHeight: 40)
- Arabic Small: 18px (lineHeight: 32)
```

### Spacing Scale
```typescript
xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48, xxxl: 64
```

### Border Radius
```typescript
sm: 4, md: 8, lg: 12, xl: 16, full: 9999
```

---

## 🔧 Key Components

### Themed Components
- `ThemedText` - Text dengan auto theme switching
- `ThemedView` - View dengan auto theme switching

### WiFiQ Components
- `WiFiQTypeSelector` - Pilih type WiFiQ
- `WiFiQValueCard` - Display nilai WiFiQ
- `WiFiQValuesGrid` - Grid layout untuk values

### UI Components
- `IconSymbol` - Icon wrapper SF Symbols (iOS) & Image (Android)
- `Collapsible` - Accordion component
- `HapticTab` - Tab dengan haptic feedback

---

## 📦 Dependencies (Key)

### Core
- `expo` ~52.0.0
- `react` ~18.3.1
- `react-native` ~0.76.6

### Navigation
- `expo-router` ~4.0.0
- `react-native-safe-area-context` ~5.6.0

### UI
- `expo-linear-gradient` ~14.0.2
- `react-native-reanimated` ~3.16.2

### Storage
- `@react-native-async-storage/async-storage` ~2.1.0

### PDF
- `react-native-pdf` ~6.7.5
- `react-native-blob-util` ~0.19.9

---

## 🚀 Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Start web
npm run web

# Type check
npx tsc --noEmit
```

---

## 📝 Type Definitions

### Doa Types (`types/doa.types.ts`)
```typescript
type DoaCategory = 'amalan' | 'hizib' | 'doa_harian' | 'rawatib'

interface DoaItem {
  id: string
  name: string
  nameArabic: string
  category: DoaCategory
  description: string
}

interface DoaContent {
  id: string
  title: string
  titleArabic: string
  category: DoaCategory
  arabic: string[]
  transliteration?: string[]
  translation?: string[]
  benefits?: string
  notes?: string
}
```

---

## 🎯 Routing Structure

### File-Based Routing
```
app/
├── _layout.tsx              → Root (Stack navigator)
│   ├── welcome.tsx          → /welcome
│   ├── (tabs)/              → Tab group
│   │   ├── _layout.tsx      → Tab layout
│   │   ├── index.tsx        → / (home)
│   │   ├── doa.tsx          → /doa
│   │   ├── ratib.tsx        → /ratib
│   │   └── explore.tsx      → /explore
│   ├── doa/[id].tsx         → /doa/:id
│   └── wifiq/[type].tsx     → /wifiq/:type
```

---

## 📱 Screens

### 1. Welcome Screen
- Onboarding flow
- First-time user experience
- AsyncStorage untuk tracking seen status

### 2. Tab Screens
- **Home**: Beranda & quick access
- **Doa**: List & search doa (16 items)
- **Ratib**: PDF viewer untuk ratib
- **Explore**: Exploration features

### 3. Detail Screens
- **Doa Detail**: Full surah/ayat dengan sections
- **WiFiQ**: Calculation berdasarkan type

---

## 🔑 Key Features

### ✅ Doa Feature
- Real-time search
- Category filter
- Grouped by category
- Detail dengan Arabic, transliteration, translation
- Safe area handling
- Smooth animations

### ✅ Theme System
- Light/dark mode support
- Islamic color palette
- Consistent spacing & typography
- Shadow system

### ✅ Responsive Design
- Safe area insets
- Cross-platform (iOS/Android)
- Proper notch/Dynamic Island handling

---

## 📊 Data Management

### Constants
- `DoaList.ts` - 16 doa items
- `surah-and-ayat.ts` - Surah data
- `WiFiQTypes.ts` - WiFiQ types

### Storage
- AsyncStorage untuk welcome status
- No database (constants-based)

---

## 🐛 Known Issues & Notes

1. **Doa Content**: Only 3 doa have full content (Al-Mulk, Ayat Kursi, Al-Waqi'ah)
2. **Route Registration**: Fixed by adding `doa/[id]` to root layout
3. **Folder Permissions**: Fixed from 700 to 755

---

## 🎨 Design Philosophy

### Islamic-inspired Design
- Green as primary (spirituality & growth)
- Gold accents (elegance)
- Earth tones (grounding)
- Off-white background (traditional paper feel)
- Arabic font (Amiri)

### UX Principles
- Pixel-perfect layouts
- Proper spacing (4px grid)
- Visual hierarchy
- Smooth animations
- Accessible (WCAG AA)

---

## 📝 Next Steps

1. ✅ Complete doa content for remaining 13 items
2. ✅ Add more surah PDFs
3. ✅ Implement dark mode fully
4. ✅ Add favorites/bookmarks
5. ✅ Add daily reminder notifications
6. ✅ Audio recitation for doas

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Framework**: React Native + Expo Router
