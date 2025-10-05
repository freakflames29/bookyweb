export const PersistenceStorageKey = {
  TOKEN: 'booklist@token_authorization2025',
  USER_INFO: 'booklist@user_authorization2025',
} as const;

export type PersistenceStorageKeyType =
  (typeof PersistenceStorageKey)[keyof typeof PersistenceStorageKey];

class StorageController {
  private setData = (key: PersistenceStorageKeyType, value: any): void => {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
        return;
      }

      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        // object, array, number, boolean
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.error('LocalStorage set error:', err);
    }
  };

  private getData = (key: PersistenceStorageKeyType): any | null => {
    try {
      const rawValue = localStorage.getItem(key);
      if (rawValue === null) return null;

      try {
        return JSON.parse(rawValue);
      } catch {
        return rawValue; // return as string if not JSON
      }
    } catch (err) {
      console.error('LocalStorage get error:', err);
      return null;
    }
  };

  private removeData = (key: PersistenceStorageKeyType): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('LocalStorage remove error:', err);
    }
  };

  private getAllData = (): Record<string, any> => {
    try {
      const allData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          try {
            allData[key] = JSON.parse(value as string);
          } catch {
            allData[key] = value;
          }
        }
      }
      return allData;
    } catch (err) {
      console.error('LocalStorage getAll error:', err);
      return {};
    }
  };

  // ---------- Public API ----------

  SET_DATA = (key: PersistenceStorageKeyType, value: any): void => {
    this.setData(key, value);
    console.log('LocalStorage saved >>', { key, value });
  };

  GET_DATA = (key: PersistenceStorageKeyType): any | false => {
    const data = this.getData(key);
    return data ?? false;
  };

  REMOVE_DATA = (key: PersistenceStorageKeyType): void => {
    this.removeData(key);
  };

  CLEAR_ALL = (): void => {
    try {
      localStorage.clear();
      console.log('All data cleared from LocalStorage');
    } catch (err) {
      console.error('LocalStorage clear error:', err);
    }
  };

  GET_ALL_DATA = (): Record<string, any> | false => {
    const all = this.getAllData();
    return all ?? false;
  };
}

export const LocalStorageController = new StorageController();
