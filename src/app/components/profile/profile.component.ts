import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { Store } from '@ngxs/store';
import { Logout, GetProfile } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile$: any;
    constructor(public auth: AuthService, private store: Store) { }

    logout() {
        this.auth.logout();
    }

    ngOnInit() {
        this.profile$ = this.store.select(state => state.auth.profile);
        this.store.dispatch(new GetProfile());
    }
}
