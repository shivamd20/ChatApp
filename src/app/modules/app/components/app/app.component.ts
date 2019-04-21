import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Ramesh';

    @Select(state => (state.auth.profile))
    profile$;

    @Select(state => (state.chat.selectedContact))
    selectedContact$;

    ngOnInit(): void {

    }
}
