import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    title = 'Ramesh';

    @Select(state => (state.auth.profile))
    profile$;

    @Select(state => (state.chat.selectedContact))
    selectedContact$;

    constructor(authService: AuthService) {
        authService.renewTokens();

    }
    ngOnInit(): void {

    }
}
