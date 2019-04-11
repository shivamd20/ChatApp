
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    login() {
        this.store.dispatch(new Login());
    }

    constructor(private store: Store
    ) { }

    ngOnInit() {
    }

}
