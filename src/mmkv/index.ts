import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV({
  id: 'user-starter-storage',
  //   path: `${USER_DIRECTORY}/storage`,
  //   encryptionKey: 'encryption_key',
});
