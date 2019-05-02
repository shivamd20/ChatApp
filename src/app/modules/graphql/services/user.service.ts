import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { SaveContacts } from '../../ngrxstate/actions/chat.action';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users$: Subscription;
    constructor(private apollo: Apollo, private store: Store) { }

    public getContacts() {
        if (!this.users$ || this.users$.closed) {


            this.users$ = this.apollo.subscribe({
                query: gql`subscription{
                user {
                  name
                  profile_pic
                  user_id
                  date_joined
                }
              }
              `
            }).pipe(retry(10)).subscribe(d => this.store.dispatch(new SaveContacts(d.data.user)), e => console.log(e)
            );
        }
    }

    public saveUserInDatabase(): Observable<Object> {
        const { sub: userId, name, picture } = this.store.selectSnapshot(state => state.auth.profile);
        return this.apollo.mutate({
            mutation: gql`
            mutation($name: String, $profile_pic:String, $user_id: String) {
                insert_user(objects:
                    {name: $name, profile_pic: $profile_pic, user_id: $user_id}
                    ,
                    on_conflict:{constraint: user_pkey, update_columns: [name, profile_pic]})
                    {
                  affected_rows
                  returning{
                  name
                  user_id
                  profile_pic
                  }
                }
              }
    `,
            variables: {
                name: name,
                profile_pic: picture,
                user_id: userId
            }
        },
        ).pipe(retry(10));
    }
}
