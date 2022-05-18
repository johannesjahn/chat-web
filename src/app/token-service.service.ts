import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  accessToken?: string;

  constructor() {}

  setAccessToken(accessToken?: string) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken ?? '');
  }

  getAccessToken(): string {
    if (this.accessToken) return this.accessToken;
    const value = localStorage.getItem('accessToken');
    if (value) this.accessToken = value;
    else this.accessToken = undefined;
    return this.accessToken!;
  }
}
