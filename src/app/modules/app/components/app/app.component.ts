import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Ramesh';

    @Select(state => (state.auth.profile))
    profile$;

    ngOnInit(): void {

    }
}
