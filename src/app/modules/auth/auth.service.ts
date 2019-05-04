import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Store } from '@ngxs/store';
import { Logout, PersistAuthCreds, Login } from '../ngrxstate/actions/auth.action';

const CLIENT_ID = 'S9AUw2i7f9n6VfpO8MnuWn3tlzwVSvKu';
const path = window.location.hostname === 'localhost' ? '' : '/ChatApp';
@Injectable()
export class AuthService {

    constructor(private store: Store) {
    }


    auth0 = new auth0.WebAuth({
        clientID: CLIENT_ID,
        domain: 'shivamd20.auth0.com',
        responseType: 'token id_token',
        redirectUri: `${window.location.protocol}//${window.location.host}${path}/authorize`,
        scope: 'openid profile'
    });

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    window.location.hash = '';
                    resolve(authResult);
                } else if (err) {
                    reject(err);
                }
            });
        });
    }



    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.store.dispatch(new PersistAuthCreds(authResult));
            } else if (err) {
                console.log(JSON.stringify(err, null, 4));
                this.store.dispatch(new Login());
            }
        });
    }

    logout() {
        this.auth0.logout({
            returnTo: `http://${window.location.host}/ChatApp`,
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

        });
    }
}
