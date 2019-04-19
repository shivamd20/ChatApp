import { Component, OnInit } from '@angular/core';
import { Store, Actions, } from '@ngxs/store';
import { ParseHash, GetProfile, SaveUserInDataBase } from 'src/app/modules/ngrxstate/actions/auth.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

    constructor(private store: Store, private actions: Actions) {

    }

    ngOnInit() {
        this.store.dispatch([new ParseHash()]).subscribe(() => this.store.dispatch(new GetProfile()).subscribe(d => this.store.dispatch(new SaveUserInDataBase())));
    }
}
