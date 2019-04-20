export class ChatStateModel {
    users: Array<Object>;
    selectedContact?;
    chats: Array<{
        id;
        msg;
        datatime: Date;
        senderDetail: {
            user_id;
            name;
            profile_pic;
        };
    }>;
}
