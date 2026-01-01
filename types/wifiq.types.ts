/**
 * WiFiQ Type Definitions
 *
 * Type definitions for WiFiQ calculation and display system
 */

/**
 * The 7 types of WiFiQ squares
 */
export type WiFiQType =
  | 'mutsalas'
  | 'murabba'
  | 'mukhamas'
  | 'musaddas'
  | 'musabba'
  | 'musamman'
  | 'mutassa';

/**
 * WiFiQ type metadata
 */
export interface WiFiQTypeMetadata {
  /** Arabic name */
  name: string;
  /** Size dimension (e.g., "3×3") */
  size: string;
  /** Day of the week in Arabic */
  day: string;
  /** Planet in Arabic */
  planet: string;
  /** Color code for UI */
  color: string;
}

/**
 * Calculated values for a WiFiQ
 */
export interface WiFiQValues {
  /** المفتاح - Key */
  miftah: number;
  /** المغلاق - Lock */
  maghlaq: number;
  /** العدل - Justice */
  adl: number;
  /** الطرح - Subtraction */
  tarh: number;
  /** الوفق - Concord */
  wafaq: number;
  /** المساحة - Area */
  masaha: number;
  /** الضابط - Controller */
  dabit: number;
  /** الغاية - Goal */
  ghayah: number;
}

/**
 * Angel name information
 */
export interface AngelName {
  /** Arabic name */
  arabic: string;
  /** Transliteration */
  transliteration: string;
  /** Meaning */
  meaning: string;
}

/**
 * Planetary hour information
 */
export interface PlanetaryHour {
  /** Hour number (1-12) */
  hour: number;
  /** Planet ruling this hour */
  planet: string;
  /** Whether this is the special hour for the WiFiQ type */
  isSpecial: boolean;
}

/**
 * Complete WiFiQ data
 */
export interface WiFiQData extends WiFiQValues {
  /** Type of WiFiQ */
  type: WiFiQType;
  /** Type metadata */
  metadata: WiFiQTypeMetadata;
  /** Angel names associated with values */
  angelNames: Record<keyof WiFiQValues, AngelName[]>;
  /** Planetary hours for day */
  dayHours: PlanetaryHour[];
  /** Planetary hours for night */
  nightHours: PlanetaryHour[];
}

/**
 * WiFiQ calculation result
 */
export interface WiFiQCalculationResult {
  /** The calculated values */
  values: WiFiQValues;
  /** Success status */
  success: boolean;
  /** Error message if calculation failed */
  error?: string;
}

/**
 * Props for WiFiQ type selector component
 */
export interface WiFiQTypeSelectorProps {
  /** Currently selected type */
  selectedType?: WiFiQType;
  /** Callback when type is selected */
  onSelect: (type: WiFiQType) => void;
}

/**
 * Props for WiFiQ value card component
 */
export interface WiFiQValueCardProps {
  /** Label in Arabic */
  label: string;
  /** Value to display */
  value: number;
  /** Transliteration */
  transliteration?: string;
}

/**
 * Props for planetary hours table component
 */
export interface PlanetaryHoursTableProps {
  /** WiFiQ type */
  type: WiFiQType;
  /** Metadata */
  metadata: WiFiQTypeMetadata;
  /** Whether this is night hours */
  isNight: boolean;
  /** Hours data */
  hours: PlanetaryHour[];
}
