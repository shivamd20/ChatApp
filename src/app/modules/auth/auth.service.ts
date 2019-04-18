import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Store } from '@ngxs/store';
import { SaveAuthData, Logout, ClearAuth } from '../ngrxstate/actions/auth.action';

const CLIENT_ID = 'S9AUw2i7f9n6VfpO8MnuWn3tlzwVSvKu';
@Injectable()
export class AuthService {

    constructor(private store: Store) {
    }


    auth0 = new auth0.WebAuth({
        clientID: CLIENT_ID,
        domain: 'shivamd20.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/authorize',
        scope: 'openid profile'
    });

    public login(): void {
        this.auth0.authorize();
    }

    // ...
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.localLogin(authResult);
            } else if (err) {
                console.log(err);
            }
        });
    }

    private localLogin(authResult): void {
        const expiresAt = (authResult.expiresIn * 1000) + Date.now();
        this.store.dispatch(new SaveAuthData({
            expiresAt: expiresAt,
            ...authResult
        }));
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
                console.log(JSON.stringify(err, null, 4));

                this.store.dispatch(new Logout());
            }
        });
    }

    logout() {
        this.store.dispatch(new ClearAuth());
        this.auth0.logout({
            returnTo: 'http://localhost:4200',
            clientID: CLIENT_ID
        });
    }

    getProfile(accessToken) {
        return new Promise((resolve, reject) => {

            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if (err) {
                    reject(err);
                } else { resolve(profile); }
            });

        })

    }

}
