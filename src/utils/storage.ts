const memoryStorage = new Map<string, string>();

export const mmkvStorage = {
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      console.warn('localStorage not available, using memory storage', e);
      memoryStorage.set(name, value);
    }
  },
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch (e) {
      console.warn('localStorage not available, using memory storage', e);
      return memoryStorage.get(name) ?? null;
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch (e) {
      console.warn('localStorage not available, using memory storage', e);
      memoryStorage.delete(name);
    }
  },
};
