import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { UserService } from 'src/app/modules/graphql/services/user.service';
import { ChatService } from 'src/app/modules/graphql/services/chat.service';
@Component({
    selector: 'app-temp',
    templateUrl: './temp.component.html',
    styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {

    chats$: Observable<Object>;

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        //   this.chats$ = this.getChats();

    }



}
