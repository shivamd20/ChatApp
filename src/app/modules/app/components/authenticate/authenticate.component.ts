import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ParseHash } from 'src/app/modules/ngrxstate/actions/auth.action';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

    constructor(private store: Store, private router: Router) {

    }

    ngOnInit() {
        this.store.dispatch(new ParseHash()).subscribe(d => this.router.navigate(['/']));
    }

}
