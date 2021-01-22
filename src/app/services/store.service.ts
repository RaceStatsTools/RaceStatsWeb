import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _accessToken: string = '';
    private _user: any = null;
    private localStorage: LocalStorage = new LocalStorage();

    constructor() {

    }

    public getToken() {
        
        const tokenContainer = this.localStorage.getLocalStorageItem(
            this.localStorage.LOCAL_STORAGE_KEYS.accessTokenStorageKey
        );
        
        return tokenContainer || '';
    }

    public setToken(accessToken: string) {
        console.log('setToken:', accessToken)
        this._accessToken = accessToken;
        this.localStorage.setLocalStorageItem(
            this.localStorage.LOCAL_STORAGE_KEYS.accessTokenStorageKey,
            this._accessToken
        );
        var storedToken = this.localStorage.getLocalStorageItem(
            this.localStorage.LOCAL_STORAGE_KEYS.accessTokenStorageKey
        )
    }

    public getUser() {
        const currentUser = this.localStorage.getLocalStorageItem(
            this.localStorage.LOCAL_STORAGE_KEYS.userStorageKey,
        );
        return currentUser;
    }

    public setUser(user: any) {
        this._user = user;

        this.localStorage.setLocalStorageItem(
            this.localStorage.LOCAL_STORAGE_KEYS.userStorageKey,
            this._user,
        );
    }

}