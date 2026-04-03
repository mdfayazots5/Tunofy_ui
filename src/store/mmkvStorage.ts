import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

let storage: any;

if (Platform.OS !== 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { MMKV } = require('react-native-mmkv');
    storage = new MMKV();
  } catch (e) {
    console.warn('MMKV not available, falling back to mock');
  }
}

const memoryStorage = new Map<string, string>();

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(name, value);
      } catch (e) {
        console.warn('localStorage not available, using memory storage', e);
        memoryStorage.set(name, value);
      }
    } else if (storage) {
      storage.set(name, value);
    }
  },
  getItem: (name) => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(name);
      } catch (e) {
        console.warn('localStorage not available, using memory storage', e);
        return memoryStorage.get(name) ?? null;
      }
    } else if (storage) {
      return storage.getString(name) ?? null;
    }
    return null;
  },
  removeItem: (name) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(name);
      } catch (e) {
        console.warn('localStorage not available, using memory storage', e);
        memoryStorage.delete(name);
      }
    } else if (storage) {
      storage.delete(name);
    }
  },
};
