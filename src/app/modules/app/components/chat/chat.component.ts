import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    @Select((state) => {
        try {
            const selectedContact = state.chat.selectedContact;

            if (selectedContact.user_id === state.auth.profile.sub) return state.chat.chats.filter(chat => chat.senderDetail.user_id === chat.receiverDetail.user_id);

            return state.chat.chats.filter((chat) => (chat.senderDetail.user_id === selectedContact.user_id || chat.receiverDetail.user_id === selectedContact.user_id));
        }
        catch (e) {
            console.log(e);
        }
    })
    chats$;

    get me() {
        return this.store.snapshot().auth.profile.sub;
    }

    chats = [
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: false,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        }
        ,
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: false,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: true,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        },
        {
            me: false,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        }
        ,
        {
            me: false,
            msg: 'Hi',
            time: '11.23',
            avtar: 'https://lh6.googleusercontent.com/-cpGv6Fv3rDU/AAAAAAAAAAI/AAAAAAAAFHY/i3FVMRazoyI/photo.jpg'
        }
    ];
    constructor(private store: Store) { }

    public getBubbleStyle({ me }) {

        return {
            'chat__bubble': true,
            'chat__bubble--rcvd': !me,
            'chat__bubble--sent': me,
            'chat__bubble--stop': true,
        };
    }

    ngOnInit() {
    }

}
