
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store) { }

    canActivate() {
        return this.isAuthenticated();
    }

    public isAuthenticated(): boolean {
        const { accessToken, expiresAt } = this.store.snapshot().auth;
        return accessToken && Date.now() < expiresAt;
    }

}
