import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngxs-intro';
    constructor(private auth: AuthService) {
        auth.handleAuthentication();
    }

    ngOnInit(): void {
        if (this.auth.isAuthenticated()) {
            this.auth.renewTokens();
        }
    }
}
