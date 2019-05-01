import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UserService } from 'src/app/modules/graphql/services/user.service';
import { Observable } from 'apollo-link';
import { GetContacts, SelectContact } from 'src/app/modules/ngrxstate/actions/chat.action';
import { ChatService } from 'src/app/modules/graphql/services/chat.service';

export interface Section {
    name: string;
    updated: Date;
}
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    @Select(state => {

        try {
            return state.chat.users
        } catch (e) {
            console.log(e);

        }
    }

    )
    contacts$: Observable<any>;

    @Select(state => (state.chat.selectedContact))
    selectedContact$;

    constructor(private store: Store, private chatService: ChatService) {

    }

    onClick(user) {
        this.store.dispatch(new SelectContact(user));
    }

    ngOnInit() {
        this.store.dispatch(new GetContacts());
        this.chatService.getChats();
    }

}
