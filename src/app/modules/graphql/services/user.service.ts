import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apollo: Apollo, private store: Store) { }

    public saveUserInDatabase(state): Observable<Object> {
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
        );
    }
}
