import { Component, OnInit } from '@angular/core';
import { Store, Actions, ofActionCompleted, ofActionDispatched, Select } from '@ngxs/store';
import { Logout, GetProfile, Login, ParseHash, SaveUserInDataBase } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


    @Select(state => state.auth.profile)
    profile$: any;


    constructor(private store: Store, private actions: Actions) { }

    logout() {
        this.store.dispatch(new Logout());
    }

    login() {
        this.store.dispatch(new Login());
    }

    ngOnInit() {

    }
}
