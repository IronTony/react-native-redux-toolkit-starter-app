import { RootStackParamList } from '@routes';

// This is to let useNavigation() is typed
declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
