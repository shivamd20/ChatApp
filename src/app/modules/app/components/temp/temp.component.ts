import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
@Component({
    selector: 'app-temp',
    templateUrl: './temp.component.html',
    styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

    constructor(private apollo: Apollo) { }

    ngOnInit() {
    }

    getGames(): Observable<any> {
        return this.apollo.subscribe({
            query: gql`subscription($key: uuid){
            ttt_state{
              data
              key
            }
          }`
        },
        );
    }

}
