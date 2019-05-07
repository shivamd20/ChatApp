import { Component, OnInit } from '@angular/core';
import { Store, Actions, Select, ofActionSuccessful } from '@ngxs/store';
import { Logout, Login, GetProfile } from 'src/app/modules/ngrxstate/actions/auth.action';
import { DeleteAllChats } from 'src/app/modules/ngrxstate/actions/chat.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


    @Select(state => state.auth.profile)
    profile$: Observable<any>;


    constructor(private store: Store, private actions$: Actions, private snackBar: MatSnackBar) { }

    logout() {
        this.store.dispatch(new Logout());
    }

    login() {
        this.store.dispatch(new Login());
    }

    ngOnInit() {

        if (!this.profile$) {
            this.store.dispatch(new GetProfile());
        }

    }

    deleteAllChats() {
        if (confirm('Are you sure? This action can not be undone..')) {
            this.store.dispatch(new DeleteAllChats());
            this.actions$
                .pipe(ofActionSuccessful(DeleteAllChats))
                .subscribe(() => this.snackBar.open('Chats Deleted Successfully!!!', undefined, {
                    duration: 5000
                }));
        }
    }
}
