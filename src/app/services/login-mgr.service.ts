import { Injectable } from '@angular/core';
import { Client, UserInfoForUserDto } from '../api/steelService';

@Injectable({
  providedIn: 'root'
})
export class LoginMgrService {
  isLoggedInStatus: boolean = true;

  userInfo: UserInfoForUserDto = new UserInfoForUserDto();

  constructor(private api: Client) { }

  isSuperUser(): boolean{
    return true;
  }

  logOut() {
    this.isLoggedInStatus = false;
    this.userInfo = new UserInfoForUserDto();
    this.configureCookie(' ', 'auth_token');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  logIn(login: string, password: string): boolean {
    this.encryptOnce(password).then(encryptedPassword => {
      this.api.logIn(login, encryptedPassword).then(result => {
        this.userInfo = result ?? new UserInfoForUserDto();
        this.configureCookie(this.userInfo.token, 'auth_token');
        this.isLoggedInStatus = true;
        return true;
      }).catch(error => {
        console.error('Login failed', error);
        this.isLoggedInStatus = false;
      })
    });

    return false;
  }

  logInWithToken(): boolean {
    this.getCookie('auth_token').then(cachedToken => {
      if (cachedToken) {
        this.userInfo.token = cachedToken;
        this.continueLogin();
        return true;
      } else {
        console.error('No token found in cookies');
        this.isLoggedInStatus = false;
        return false;
      }
    });

    return false;
  }

  continueLogin() {
    this.api.logInWithToken(this.userInfo.token ?? '').then(result => {
      this.userInfo = result ?? new UserInfoForUserDto();
        this.configureCookie(this.userInfo.token, 'auth_token');
        this.isLoggedInStatus = true;
    }).catch(error => {
      console.error('Login with token failed', error);
      this.isLoggedInStatus = false;
    });

    return false;
  }

  async encryptOnce(psswd: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(psswd);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64Hash = btoa(String.fromCharCode(...hashArray));

    return base64Hash.slice(0, 32);
  }

  configureCookie(value: string | undefined, cookieName: string | undefined) {
    if (!value) {
      console.error("Value is undefined or empty");
      return;
    }

    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); 
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cookieName}=${value}; ${expires}; path=/`;
  }

  getCookie(name: string): Promise<string | null> {
    return new Promise((resolve) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      resolve(match ? match[2] : null);
    });
  }
}
