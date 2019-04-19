import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Store } from '@ngxs/store';
import { Logout, ClearState } from '../ngrxstate/actions/auth.action';

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


    /*TODO
        public renewTokens(): void {
            this.auth0.checkSession({}, (err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    //TODO this.localLogin(authResult);
                } else if (err) {
                    alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
                    console.log(JSON.stringify(err, null, 4));
                    this.store.dispatch(new Logout());
                }
            });
        }
        */

    logout() {
        this.store.dispatch(new ClearState());
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
