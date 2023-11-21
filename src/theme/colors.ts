import { tokens } from '@tamagui/themes';
import { createTokens } from 'tamagui';

const palette = {
  torquise: '#1abc9c',
  emerald: '#2ecc71',
  green_sea: '#16a085',
  nephritis: '#27ae60',
  sun_flower: '#f1c40f',
  orange: '#f39c12',
  carrot: '#e67e22',
  pumpkin: '#d35400',
  peter_river: '#3498db',
  belize_hole: '#2980b9',
  alizarin: '#e74c3c',
  pomegranate: '#c0392b',
  amethyst: '#9b59b6',
  wisteria: '#8e44ad',
  wet_asphalt: '#34495e',
  midnight_blue: '#2c3e50',
  absestos: '#7f8c8d',
  concrete: '#95a5a6',
  silver: '#bdc3c7',
  clouds: '#ecf0f1',
  white: '#fff',
  black: '#000',
  transparent: '#00000000',
  grey_shadow_7: 'rgba(216,216,216,0.7)',
  black_opacity_7: 'rgba(0,0,0,0.7)',
};

const customTokens = createTokens({
  ...tokens,
  color: {
    ...palette,
  },
});

export { customTokens, palette };
