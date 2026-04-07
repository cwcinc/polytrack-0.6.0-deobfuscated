class CombinedPolyTrackStorage {
  constructor() {
    this.indexedDBStorage = new BetterPolyTrackStorage();
    this.localStorage = new DefaultPolyTrackStorage();
  }
  async getItem(key) {
    try {
      const result = await this.indexedDBStorage.getItem(key);
      if (result !== undefined) {
        return result;
      }
    } catch (e) {
      console.error("Error accessing IndexedDB, falling back to localStorage:", e);
    }
    return Promise.resolve(this.localStorage.getItem(key));
  }
  async setItem(key, value) {
    try {
      await this.indexedDBStorage.setItem(key, value);
    } catch (e) {
      console.error("Error accessing IndexedDB, falling back to localStorage:", e);
      return Promise.resolve(this.localStorage.setItem(key, value));
    }
  }
  async removeItem(key) {
    try {
      await this.indexedDBStorage.removeItem(key);
    } catch (e) {
      console.error("Error accessing IndexedDB, falling back to localStorage:", e);
      return Promise.resolve(this.localStorage.removeItem(key));
    }
  }
  async getAllKeys() {
    try {
      return await this.indexedDBStorage.getAllKeys();
    } catch (e) {
      console.error("Error accessing IndexedDB, falling back to localStorage:", e);
      return Promise.resolve(this.localStorage.getAllKeys());
    }
  }
}


class BetterPolyTrackStorage {
  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open("PolyTrackDatabase", 1);
      request.onerror = (event) => {
        reject(new Error("Failed to open IndexedDB"));
      }
      request.onsuccess = (event) => {
        resolve(request.result);
      }
    });
  }
  async getItem(key) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tracks"], "readonly");
      const objectStore = transaction.objectStore("tracks");
      const request = objectStore.get(key);
      request.onerror = (event) => {
        reject(new Error("Failed to get item from IndexedDB"));
      }
      request.onsuccess = (event) => {
        resolve(request.result);
      }
    });
  }
  async setItem(key, value) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tracks"], "readwrite");
      const objectStore = transaction.objectStore("tracks");
      const request = objectStore.put(value, key);
      request.onerror = (event) => {
        reject(new Error("Failed to set item in IndexedDB"));
      }
      request.onsuccess = (event) => {
        resolve();
      }
    });
  }
  async removeItem(key) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tracks"], "readwrite");
      const objectStore = transaction.objectStore("tracks");
      const request = objectStore.delete(key);
      request.onerror = (event) => {
        reject(new Error("Failed to remove item from IndexedDB"));
      }
      request.onsuccess = (event) => {
        resolve();
      }
    });
  }
  async getAllKeys() {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tracks"], "readonly");
      const objectStore = transaction.objectStore("tracks");
      const request = objectStore.getAllKeys();
      request.onerror = (event) => {
        reject(new Error("Failed to get all keys from IndexedDB"));
      }
      request.onsuccess = (event) => {
        resolve(request.result);
      }
    });
  }
}

class DefaultPolyTrackStorage {
  constructor() {
  }
  getItem(key) {
    return window.localStorage.getItem(key);
  }
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  }
  removeItem(key) {
    window.localStorage.removeItem(key);
  }
  getAllKeys() {
    return Object.keys(window.localStorage);
  }
}