import { NavigationProp, StackActionType } from '@react-navigation/native';

export type NavigateProps = {
  (name: string, params?: unknown): void;
};

export type GenericNavigationProps = {
  navigate: NavigateProps;
  setOptions: (options: Partial<unknown>) => void;
  goBack: () => StackActionType;
};
