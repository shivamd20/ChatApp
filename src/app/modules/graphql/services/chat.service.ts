import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { SaveChats } from '../../ngrxstate/actions/chat.action';


@Injectable({
    providedIn: 'root'
})
export class ChatService implements OnDestroy {
    chats$: Subscription;


    ngOnDestroy(): void {
        this.chats$.unsubscribe();
    }

    constructor(private apollo: Apollo, private store: Store) {
        this.getChats();
    }

    private getChats() {
        this.chats$ = this.apollo.subscribe({
            query: gql`subscription ($user_id: String) {
                chat(order_by: {datetime: asc}, where: {_or: [{sender: {_eq: $user_id}},{receiver: {_eq: $user_id}} ]}) {
                  id
                  msg
                  datetime
                  senderDetail {
                    profile_pic
                    user_id
                    name
                  }
                }
              }
              `,
            variables: {
                'user_id': this.store.snapshot().auth.profile.sub
            }
        },
        ).pipe(map(val => val.data.chat)).subscribe(data => {
            this.store.dispatch(new SaveChats(data));
        });
    }
}
