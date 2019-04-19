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

    games$: Observable<Object>;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        this.games$ = this.getGames();

        this.games$.subscribe(d => console.log(d));

    }

    getGames(): Observable<any> {
        return this.apollo.subscribe({
            query: gql`query{
            ttt_state{
              data
              key
            }
          }`
        },
        );
    }

}
