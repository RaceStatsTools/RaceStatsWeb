import { LZ77 } from './lz77_compression';

export class LocalStorage {
  private _accessToken: string = '';
  private _user: any = {};
  private LZ77_COMPRESSER = new LZ77();

  public LOCAL_STORAGE_KEYS = {
    accessTokenStorageKey: 'token',
    userStorageKey: 'user'
  };

  constructor() {

  }

  public getLocalStorageItem(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    } catch (e) {
      return undefined;
    }
  }


  public setLocalStorageItem(key: string, payload: any) {
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      console.log(key, JSON.stringify(payload))
    } catch (e) {
      throw new Error('Can\'t set local storage item');
    }
  }

  public getSecureLocalStorageItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(
        this.LZ77_COMPRESSER.decompress(decodeURIComponent(window.atob(value))),
      );
    } catch (e) {
      return undefined;
    }
  }

  public setSecureLocalStorageItem(key: string, payload: any): void {
    try {
      return localStorage.setItem(
        key,
        window.btoa(
          encodeURIComponent(this.LZ77_COMPRESSER.compress(JSON.stringify(payload))),
        ),
      );
    } catch (e) {
      return undefined;
    }
  }
}
