import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/graphql/services/user.service';
import { Store } from '@ngxs/store';
import { SendMessage } from 'src/app/modules/ngrxstate/actions/chat.action';

@Component({
    selector: 'app-chatscreen',
    templateUrl: './chatscreen.component.html',
    styleUrls: ['./chatscreen.component.css']
})
export class ChatscreenComponent implements OnInit {

    constructor(private userService: UserService, private store: Store) { }
    ngOnInit() {
        this.userService.getContacts();
    }

    send(textarea) {
        this.store.dispatch(new SendMessage(textarea.value));
        textarea.value = '';
    }

}
