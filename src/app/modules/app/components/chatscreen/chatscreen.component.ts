import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/graphql/services/user.service';

@Component({
    selector: 'app-chatscreen',
    templateUrl: './chatscreen.component.html',
    styleUrls: ['./chatscreen.component.css']
})
export class ChatscreenComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getContacts();
    }

}
