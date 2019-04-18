import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Store, Select } from '@ngxs/store';
import { ParseHash } from 'src/app/modules/ngrxstate/actions/auth.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngxs-intro';

    @Select(state => (state.auth.profile) ? state.auth.profile.picture : undefined)
    picture$;

    constructor(private store: Store) {
        store.dispatch(new ParseHash());
    }

    ngOnInit(): void {

    }
}
