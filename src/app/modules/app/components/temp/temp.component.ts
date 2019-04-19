import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { UserService } from 'src/app/modules/graphql/services/user.service';
@Component({
    selector: 'app-temp',
    templateUrl: './temp.component.html',
    styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

    games$: Observable<Object>;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.games$ = this.getGames();

        this.games$.subscribe(d => console.log(d));

    }

    getGames(): any {
        return this.userService.saveUserInDatabase();
    }

}
