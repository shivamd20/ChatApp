import { AuthState } from '../ngrxstate/state/auth.state';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    path: import('@angular/router').ActivatedRouteSnapshot[];
    route: import('@angular/router').ActivatedRouteSnapshot;
    constructor(private store: Store) { }

    canActivate() {
        return this.store.select(AuthState.token);
    }

}
