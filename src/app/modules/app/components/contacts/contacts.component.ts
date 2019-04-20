import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserService } from 'src/app/modules/graphql/services/user.service';

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

    contacts = [
    ];

    constructor(private store: Store, private userService: UserService) {

    }

    async ngOnInit() {
        this.contacts = await this.userService.getContacts();
    }

}
