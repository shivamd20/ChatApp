import { Component, OnInit } from '@angular/core';

export interface Section {
    name: string;
    updated: Date;
}
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

    contacts = [
        {
            'name': 'ramesh',
            'profile_pic': 'ahaha',
            'user_id': 'ramesh1',
            'date_joined': '2019-04-19T12:44:38.911809+00:00'
        },
        {
            'name': 'ramesh',
            'profile_pic': 'profile_pic',
            'user_id': 'user_id',
            'date_joined': '2019-04-19T13:52:59.897708+00:00'
        },
        {
            'name': 'Shivam Dwivedi',
            'profile_pic': 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg',
            'user_id': 'google-oauth2|105340382558189294995',
            'date_joined': '2019-04-19T17:44:28.922496+00:00'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
