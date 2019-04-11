import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Store } from '@ngxs/store';
import { ParseHash } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngxs-intro';
    showFiller = false;
    constructor(private store: Store) {
        store.dispatch(new ParseHash());
    }

    ngOnInit(): void {

    }
}
