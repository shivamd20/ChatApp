import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private apollo: Apollo) { }

    public saveUserInDatabase(): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
            mutation($name: String, $profile_pic:String, $user_id: String) {
                insert_user(objects:
                    {name: $name, profile_pic: $profile_pic, user_id: $user_id}
                    ,
                    on_conflict:{constraint: user_pkey, update_columns: [name, profile_pic]})
                    {
                  affected_rows
                }
              }
    `,
            variables: {
                name: 'ramesh',
                profile_pic: 'profile_pic',
                user_id: 'user_id'
            }
        },
        );

    }

}
