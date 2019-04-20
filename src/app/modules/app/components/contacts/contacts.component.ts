import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UserService } from 'src/app/modules/graphql/services/user.service';
import { Observable } from 'apollo-link';
import { GetContacts } from 'src/app/modules/ngrxstate/actions/chat.action';

export interface Section {
    name: string;
    updated: Date;
}
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

    @Select(state => state.chat.users)
    contacts$: Observable<any>;

    constructor(private store: Store) {

    }

    ngOnInit() {
        this.store.dispatch(new GetContacts());
    }

}
