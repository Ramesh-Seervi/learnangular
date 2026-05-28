import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _isLoggedIn = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.set(localStorage.getItem('isLoggedIn') === 'true');
    }
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  public login(): void {
    this._isLoggedIn.set(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  public logout(): void {
    this._isLoggedIn.set(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
    }
  }
}
