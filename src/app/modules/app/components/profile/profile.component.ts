import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout, GetProfile, Login } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile$: any;
    constructor(private store: Store) { }

    logout() {
        this.store.dispatch(new Logout());
    }

    login() {
        this.store.dispatch(new Login());
    }

    ngOnInit() {
        this.store.dispatch(new GetProfile());
        this.profile$ = this.store.select(state => state.auth.profile);
    }
}
