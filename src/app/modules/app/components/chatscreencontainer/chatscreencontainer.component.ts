import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChatService } from 'src/app/modules/graphql/services/chat.service';

@Component({
    selector: 'app-chatscreencontainer',
    templateUrl: './chatscreencontainer.component.html',
    styleUrls: ['./chatscreencontainer.component.css']
})
export class ChatscreencontainerComponent implements OnInit {

    constructor(private store: Store, private chatService: ChatService) { }


    @Select(state => state.chat.chats)
    chats$;

    get me() {
        return this.store.snapshot().auth.profile.sub;
    }

    ngOnInit() {

    }

}
