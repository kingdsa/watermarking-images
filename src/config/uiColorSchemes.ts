export type SchemeRole = 'primary' | 'secondary' | 'accent' | 'background' | 'surface'
export type GradientPair = [SchemeRole, SchemeRole]

export type ColorFamily =
  | 'blue'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'pink'
  | 'purple'
  | 'brown'
  | 'gray'

export type SchemeRegion = 'overseas' | 'mainland'

export interface SchemeColorSet {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  textPrimary: string
  textSecondary: string
  border: string
}

export interface ColorScheme {
  id: string
  platform?: 'mobile' | 'pc' | 'both'
  region: SchemeRegion
  colorFamily: ColorFamily
  light: SchemeColorSet
  dark: SchemeColorSet
}

export const uiColorSchemes: ColorScheme[] = [
  {
    id: 'cobaltSlate',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'blue',
    light: {
      primary: '#1D4ED8',
      secondary: '#475569',
      accent: '#2563EB',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      border: '#E2E8F0'
    },
    dark: {
      primary: '#60A5FA',
      secondary: '#94A3B8',
      accent: '#3B82F6',
      background: '#0B0F1A',
      surface: '#131A2A',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#1E293B'
    }
  },
  {
    id: 'creamLatte',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'brown',
    light: {
      primary: '#8B5E3C',
      secondary: '#A87B5E',
      accent: '#C8A27C',
      background: '#FAF6F0',
      surface: '#FFFFFF',
      textPrimary: '#2A1F14',
      textSecondary: '#6B4F35',
      border: '#E8DDD0'
    },
    dark: {
      primary: '#C8A27C',
      secondary: '#A87B5E',
      accent: '#D4B594',
      background: '#1A130B',
      surface: '#251B11',
      textPrimary: '#F4E9DC',
      textSecondary: '#C8A27C',
      border: '#3A2B1B'
    }
  },
  {
    id: 'graphiteMono',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'gray',
    light: {
      primary: '#18181B',
      secondary: '#52525B',
      accent: '#3F3F46',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      textPrimary: '#18181B',
      textSecondary: '#52525B',
      border: '#E4E4E7'
    },
    dark: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
      accent: '#D4D4D8',
      background: '#09090B',
      surface: '#18181B',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
      border: '#27272A'
    }
  },
  {
    id: 'tuscanyTerracotta',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'orange',
    light: {
      primary: '#B85C38',
      secondary: '#9C6644',
      accent: '#C2410C',
      background: '#FDF8F3',
      surface: '#FFFFFF',
      textPrimary: '#2A1410',
      textSecondary: '#7C2D12',
      border: '#F4D8C4'
    },
    dark: {
      primary: '#E07B4F',
      secondary: '#B85C38',
      accent: '#F97316',
      background: '#1B0F08',
      surface: '#291710',
      textPrimary: '#FBE6D8',
      textSecondary: '#E0A47E',
      border: '#3D1F14'
    }
  },
  {
    id: 'provenceLavender',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'purple',
    light: {
      primary: '#7C6F9F',
      secondary: '#9B8AB8',
      accent: '#6D5D8E',
      background: '#F6F2F9',
      surface: '#FFFFFF',
      textPrimary: '#1F1A2A',
      textSecondary: '#5C4F78',
      border: '#DDD2E8'
    },
    dark: {
      primary: '#B3A4D1',
      secondary: '#9B8AB8',
      accent: '#C3B0DE',
      background: '#150F1F',
      surface: '#20182C',
      textPrimary: '#EDE3F4',
      textSecondary: '#B3A4D1',
      border: '#2F2540'
    }
  },
  {
    id: 'nordicFjord',
    platform: 'mobile',
    region: 'overseas',
    colorFamily: 'blue',
    light: {
      primary: '#1E3A5F',
      secondary: '#4A6B8A',
      accent: '#2C5282',
      background: '#F0F4F8',
      surface: '#FFFFFF',
      textPrimary: '#0F1F30',
      textSecondary: '#3A5470',
      border: '#C9D6E5'
    },
    dark: {
      primary: '#6B8FB0',
      secondary: '#4A6B8A',
      accent: '#7FA3C7',
      background: '#0A1520',
      surface: '#122130',
      textPrimary: '#DCE6F0',
      textSecondary: '#7FA3C7',
      border: '#1E3550'
    }
  },
  {
    id: 'minimalPro',
    region: 'mainland',
    colorFamily: 'gray',
    light: {
      primary: '#1E2227',
      secondary: '#6B7077',
      accent: '#3C5A78',
      background: '#F7F5F1',
      surface: '#FFFFFF',
      textPrimary: '#1E2227',
      textSecondary: '#6B7077',
      border: '#E7E3DA'
    },
    dark: {
      primary: '#E8E6E3',
      secondary: '#9BA1A6',
      accent: '#5B7FA1',
      background: '#1A1D21',
      surface: '#242830',
      textPrimary: '#E8E6E3',
      textSecondary: '#9BA1A6',
      border: '#363A42'
    }
  },
  {
    id: 'oceanTech',
    region: 'mainland',
    colorFamily: 'blue',
    light: {
      primary: '#0284C7',
      secondary: '#0EA5E9',
      accent: '#06B6D4',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      textPrimary: '#0C1E33',
      textSecondary: '#475569',
      border: '#BAE6FD'
    },
    dark: {
      primary: '#38BDF8',
      secondary: '#0EA5E9',
      accent: '#22D3EE',
      background: '#0B1220',
      surface: '#111C30',
      textPrimary: '#E0F2FE',
      textSecondary: '#94A3B8',
      border: '#1E3A5F'
    }
  },
  {
    id: 'vibrantWarmth',
    region: 'mainland',
    colorFamily: 'orange',
    light: {
      primary: '#EA580C',
      secondary: '#F59E0B',
      accent: '#DC2626',
      background: '#FFF7ED',
      surface: '#FFFFFF',
      textPrimary: '#1F1311',
      textSecondary: '#78350F',
      border: '#FED7AA'
    },
    dark: {
      primary: '#FB923C',
      secondary: '#FBBF24',
      accent: '#F87171',
      background: '#1B0F0A',
      surface: '#2A1810',
      textPrimary: '#FFEDD5',
      textSecondary: '#D6A87A',
      border: '#3F2317'
    }
  },
  {
    id: 'forestNature',
    region: 'mainland',
    colorFamily: 'green',
    light: {
      primary: '#16A34A',
      secondary: '#65A30D',
      accent: '#059669',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      textPrimary: '#0F1F0E',
      textSecondary: '#4D7C0F',
      border: '#BBF7D0'
    },
    dark: {
      primary: '#4ADE80',
      secondary: '#A3E635',
      accent: '#34D399',
      background: '#0A1A0F',
      surface: '#102617',
      textPrimary: '#DCFCE7',
      textSecondary: '#86EFAC',
      border: '#1F3D27'
    }
  },
  {
    id: 'purpleDream',
    region: 'mainland',
    colorFamily: 'purple',
    light: {
      primary: '#9333EA',
      secondary: '#EC4899',
      accent: '#8B5CF6',
      background: '#FDF4FF',
      surface: '#FFFFFF',
      textPrimary: '#1F0A2E',
      textSecondary: '#6B21A8',
      border: '#E9D5FF'
    },
    dark: {
      primary: '#C084FC',
      secondary: '#F472B6',
      accent: '#A78BFA',
      background: '#15082A',
      surface: '#20113C',
      textPrimary: '#F3E8FF',
      textSecondary: '#C4B5FD',
      border: '#312E5F'
    }
  },
  {
    id: 'sunsetGlow',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'red',
    light: {
      primary: '#E11D48',
      secondary: '#F97316',
      accent: '#FB7185',
      background: '#FFF1F2',
      surface: '#FFFFFF',
      textPrimary: '#1C0A10',
      textSecondary: '#9F1239',
      border: '#FECDD3'
    },
    dark: {
      primary: '#FB7185',
      secondary: '#FB923C',
      accent: '#F472B6',
      background: '#1A0810',
      surface: '#2A1118',
      textPrimary: '#FFE4E6',
      textSecondary: '#FCA5A5',
      border: '#4C1D2B'
    }
  },
  {
    id: 'mintFresh',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'cyan',
    light: {
      primary: '#0D9488',
      secondary: '#10B981',
      accent: '#14B8A6',
      background: '#ECFDF5',
      surface: '#FFFFFF',
      textPrimary: '#042F2E',
      textSecondary: '#0F766E',
      border: '#99F6E4'
    },
    dark: {
      primary: '#2DD4BF',
      secondary: '#34D399',
      accent: '#5EEAD4',
      background: '#04201D',
      surface: '#0B2E2A',
      textPrimary: '#CCFBF1',
      textSecondary: '#5EEAD4',
      border: '#134E4A'
    }
  },
  {
    id: 'cyberNeon',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'purple',
    light: {
      primary: '#7C3AED',
      secondary: '#DB2777',
      accent: '#06B6D4',
      background: '#FAF5FF',
      surface: '#FFFFFF',
      textPrimary: '#1E0A3C',
      textSecondary: '#6B21A8',
      border: '#DDD6FE'
    },
    dark: {
      primary: '#A855F7',
      secondary: '#EC4899',
      accent: '#22D3EE',
      background: '#0B0420',
      surface: '#160A2E',
      textPrimary: '#E9D5FF',
      textSecondary: '#C4B5FD',
      border: '#3B1A6B'
    }
  },
  {
    id: 'roseQuartz',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'pink',
    light: {
      primary: '#BE185D',
      secondary: '#DB2777',
      accent: '#F472B6',
      background: '#FDF2F8',
      surface: '#FFFFFF',
      textPrimary: '#3B0A1E',
      textSecondary: '#9D174D',
      border: '#FBCFE8'
    },
    dark: {
      primary: '#F472B6',
      secondary: '#EC4899',
      accent: '#F9A8D4',
      background: '#1A0712',
      surface: '#2A0F1E',
      textPrimary: '#FCE7F3',
      textSecondary: '#F9A8D4',
      border: '#4A102E'
    }
  },
  {
    id: 'inkLavender',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'purple',
    light: {
      primary: '#4338CA',
      secondary: '#6366F1',
      accent: '#8B5CF6',
      background: '#EEF2FF',
      surface: '#FFFFFF',
      textPrimary: '#1E1B4B',
      textSecondary: '#4338CA',
      border: '#C7D2FE'
    },
    dark: {
      primary: '#818CF8',
      secondary: '#6366F1',
      accent: '#A78BFA',
      background: '#0B0820',
      surface: '#13102E',
      textPrimary: '#E0E7FF',
      textSecondary: '#A5B4FC',
      border: '#2E2867'
    }
  },
  {
    id: 'tropicalCoral',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'red',
    light: {
      primary: '#DC2626',
      secondary: '#F59E0B',
      accent: '#EF4444',
      background: '#FEF2F2',
      surface: '#FFFFFF',
      textPrimary: '#2A0808',
      textSecondary: '#991B1B',
      border: '#FECACA'
    },
    dark: {
      primary: '#F87171',
      secondary: '#FBBF24',
      accent: '#FCA5A5',
      background: '#1B0808',
      surface: '#2A0E0E',
      textPrimary: '#FEE2E2',
      textSecondary: '#FCA5A5',
      border: '#3F1414'
    }
  },
  {
    id: 'midnightGold',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'yellow',
    light: {
      primary: '#B45309',
      secondary: '#CA8A04',
      accent: '#D97706',
      background: '#FFFBEB',
      surface: '#FFFFFF',
      textPrimary: '#1C1410',
      textSecondary: '#92400E',
      border: '#FDE68A'
    },
    dark: {
      primary: '#FBBF24',
      secondary: '#FACC15',
      accent: '#FCD34D',
      background: '#16110A',
      surface: '#22190C',
      textPrimary: '#FEF3C7',
      textSecondary: '#FCD34D',
      border: '#3D2E12'
    }
  },
  {
    id: 'springMatcha',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'green',
    light: {
      primary: '#4D7C0F',
      secondary: '#65A30D',
      accent: '#84CC16',
      background: '#F7FEE7',
      surface: '#FFFFFF',
      textPrimary: '#1A2E05',
      textSecondary: '#3F6212',
      border: '#D9F99D'
    },
    dark: {
      primary: '#A3E635',
      secondary: '#BEF264',
      accent: '#BEF264',
      background: '#0D1706',
      surface: '#16240B',
      textPrimary: '#ECFCCB',
      textSecondary: '#BEF264',
      border: '#2F4A14'
    }
  },
  {
    id: 'auroraBerry',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'purple',
    light: {
      primary: '#6D28D9',
      secondary: '#C026D3',
      accent: '#4F46E5',
      background: '#FAF5FF',
      surface: '#FFFFFF',
      textPrimary: '#1E0A3C',
      textSecondary: '#6B21A8',
      border: '#E9D5FF'
    },
    dark: {
      primary: '#A855F7',
      secondary: '#D946EF',
      accent: '#818CF8',
      background: '#0C0420',
      surface: '#170A2E',
      textPrimary: '#F3E8FF',
      textSecondary: '#D8B4FE',
      border: '#2D1A5C'
    }
  },
  {
    id: 'glacierIce',
    platform: 'mobile',
    region: 'mainland',
    colorFamily: 'cyan',
    light: {
      primary: '#0E7490',
      secondary: '#0891B2',
      accent: '#155E75',
      background: '#ECFEFF',
      surface: '#FFFFFF',
      textPrimary: '#083344',
      textSecondary: '#155E75',
      border: '#A5F3FC'
    },
    dark: {
      primary: '#22D3EE',
      secondary: '#06B6D4',
      accent: '#67E8F9',
      background: '#04141B',
      surface: '#0B1F2A',
      textPrimary: '#CFFAFE',
      textSecondary: '#67E8F9',
      border: '#15535F'
    }
  }
]

export const colorFamilyOrder: ColorFamily[] = [
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
  'brown',
  'gray'
]

export const colorFamilySwatch: Record<ColorFamily, string> = {
  blue: '#1D4ED8',
  cyan: '#0D9488',
  green: '#16A34A',
  yellow: '#CA8A04',
  orange: '#EA580C',
  red: '#DC2626',
  pink: '#BE185D',
  purple: '#9333EA',
  brown: '#8B5E3C',
  gray: '#52525B'
}
