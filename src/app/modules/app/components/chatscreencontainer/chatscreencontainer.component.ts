import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChatService } from 'src/app/modules/graphql/services/chat.service';

@Component({
    selector: 'app-chatscreencontainer',
    templateUrl: './chatscreencontainer.component.html',
    styleUrls: ['./chatscreencontainer.component.scss']
})
export class ChatscreencontainerComponent implements OnInit {

    constructor(private store: Store, private chatService: ChatService) { }

    @Select((state) => {
        try {
            const selectedContact = state.chat.selectedContact;

            if (selectedContact.user_id === state.auth.profile.sub) {
                return state.chat.chats.filter(chat => chat.senderDetail.user_id === chat.receiverDetail.user_id);
            }

            return state.chat.chats.filter((chat) =>
                (chat.senderDetail.user_id === selectedContact.user_id || chat.receiverDetail.user_id === selectedContact.user_id));
        } catch (e) {
            console.log(e);
        }
    })
    chats$;

    get me() {
        return this.store.snapshot().auth.profile.sub;
    }

    ngOnInit() {

    }

}
