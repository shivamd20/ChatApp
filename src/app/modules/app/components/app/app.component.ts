import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngxs-intro';

    @Select(state => (state.auth.profile) ? state.auth.profile.picture : undefined)
    picture$;

    ngOnInit(): void {

    }
}
