import { AppConfig } from './tamagui.config';

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  type TamaguiCustomConfig = AppConfig;
}

export * from 'tamagui';
