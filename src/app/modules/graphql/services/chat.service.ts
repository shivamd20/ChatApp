import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngxs/store';
import { map, retry } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { SaveChats } from '../../ngrxstate/actions/chat.action';


@Injectable({
    providedIn: 'root'
})
export class ChatService implements OnDestroy {
    private chats$: Subscription;


    ngOnDestroy(): void {
        this.chats$.unsubscribe();
    }

    constructor(private apollo: Apollo, private store: Store) {

    }

    public getChats() {

        const profile = this.store.snapshot().auth.profile;

        if (!profile) {
            return;
        }

        const user_id = profile.sub;

        if (!this.chats$ || this.chats$.closed) {
            this.chats$ = this.apollo.subscribe({
                query: gql`subscription ($user_id: String) {
                    chat(order_by: {datetime: asc}, where: {receiver: {_eq: $user_id}}) {
                      id
                      msg
                      datetime
                      senderDetail {
                        profile_pic
                        user_id
                        name
                      }
                      receiverDetail {
                        profile_pic
                        user_id
                        name
                      }
                    }
                  }
              `,
                variables: {
                    'user_id': user_id
                }
            },
            ).pipe(retry(10), map(val => val.data.chat)).subscribe(data => {
                this.store.dispatch(new SaveChats(data));
            });
        }
    }

    public sendMessage(msg, receiver): Observable<Object> {


        return this.apollo.mutate({
            mutation: gql`mutation ($sender: String, $receiver: String, $msg: String) {
                insert_chat(objects: {msg: $msg, sender: $sender, receiver: $receiver}) {
                  affected_rows
                  returning {
                    datetime
                    id
                    msg
                    receiverDetail {
                      name
                      profile_pic
                      user_id
                    }
                    senderDetail {
                      name
                      profile_pic
                      user_id
                    }
                  }
                }
              }
    `,
            variables: {
                'sender': this.store.snapshot().auth.profile.sub,
                'receiver': receiver.user_id,
                'msg': msg
            }
        },
        ).pipe(retry(10));
    }

    public deleteAllChats(): Observable<Object> {
        return this.apollo.mutate({
            mutation: gql`mutation($user_id: String) {
                delete_chat(where: {receiver: {_eq: $user_id}}) {
                  affected_rows
                }
              }
    `,
            variables: {
                user_id: this.store.snapshot().auth.profile.sub
            }
        },
        ).pipe(retry(10));
    }

    public deleteReceivedChats(deleteChats): Observable<Object> {
        return this.apollo.mutate({
            mutation: gql`mutation ($chat_ids: [Int]) {
                delete_chat(where: {id: {_in: $chat_ids}}) {
                  affected_rows
                }
              }
    `,
            variables: {
                chat_ids: deleteChats
            }
        },
        ).pipe(retry(10));
    }
}
