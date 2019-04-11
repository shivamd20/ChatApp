import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Store } from '@ngxs/store';
import { Login, SaveAuthData, Logout } from '../ngrxstate/actions/auth.action';
import { AuthStateModel } from '../ngrxstate/models/auth.model';

@Injectable()
export class AuthService {


    auth0 = new auth0.WebAuth({
        clientID: 'S9AUw2i7f9n6VfpO8MnuWn3tlzwVSvKu',
        domain: 'shivamd20.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/',
        scope: 'openid profile'
    });

    authState: AuthStateModel = {
        accessToken: undefined,
        expiresAt: undefined,
        idToken: undefined
    };

    constructor(private router: Router, private store: Store) {
        this.store.select(state => state.auth).subscribe(data => {
            this.authState = data;
        });
    }


    public login(): void {
        this.auth0.authorize();
    }

    // ...
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.localLogin(authResult);
                this.router.navigate(['/profile']);
            } else if (err) {
                this.router.navigate(['/login']);
            }
        });
    }

    private localLogin(authResult): void {
        const expiresAt = (authResult.expiresIn * 1000) + Date.now();
        this.store.dispatch(new SaveAuthData({
            accessToken: authResult.accessToken,
            expiresAt: expiresAt,
            idToken: authResult.idToken,
        }));
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
                this.logout();
            }
        });
    }

    public logout(): void {
        this.store.dispatch(new Logout());
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return this.authState.accessToken && Date.now() < this.authState.expiresAt;
    }

    // ...
    userProfile: any;

    //...
    public getProfile(cb): void {
        if (!this.authState.accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        this.auth0.client.userInfo(this.authState.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

}
