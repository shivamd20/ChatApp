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

export class SelectContact {
    public static readonly type = '[Chat] SelectContact';
    constructor(public payload: string) { }
}

export class SendMessage {
    public static readonly type = '[Chat] SendMessage';
    constructor(public payload: string) { }
}

export class DeleteAllChats {
    public static readonly type = '[Chat] DeleteAllChats';
}
export class DeleteReceivedChats {
    public static readonly type = '[Chat] DeleteReceivedChats';
    constructor(public payload: number[]) { }
}
