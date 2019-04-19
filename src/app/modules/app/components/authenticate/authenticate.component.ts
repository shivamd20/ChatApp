import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ParseHash, GetProfile, SaveUserInDataBase } from 'src/app/modules/ngrxstate/actions/auth.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

    constructor(private store: Store) {

    }

    async ngOnInit() {
        await this.store.dispatch([new ParseHash()]).toPromise();
        await this.store.dispatch(new GetProfile()).toPromise();
        await this.store.dispatch(new SaveUserInDataBase()).toPromise();
        this.store.dispatch(new Navigate(['/']));
    }
}
