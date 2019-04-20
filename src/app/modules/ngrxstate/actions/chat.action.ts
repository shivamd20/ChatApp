export class GetContacts {
    public static readonly type = '[Chat] GetContacts';
}
export class SaveChats {
    public static readonly type = '[Chat] SaveChats';
    constructor(public payload: Array<{
        id;
        msg;
        datatime: Date;
        senderDetail: {
            user_id;
            name;
            profile_pic;
        };
    }>) { }
}
