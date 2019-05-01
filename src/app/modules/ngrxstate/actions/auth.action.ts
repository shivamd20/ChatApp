
export class Login {
    static readonly type = '[Auth] Login';
}

export class PersistAuthCreds {
    static readonly type = '[Auth] PersistAuthCreds';
    constructor(public payload) {

    }
}
export class Logout {
    static readonly type = '[Auth] Logout';
}

export class GetProfile {
    static readonly type = '[Auth] GetProfile';
}


export class ParseHash {
    static readonly type = '[Auth] ParseHash';
}

export class SaveUserInDataBase {
    static readonly type = '[Auth] SaveUserInDataBase';
}
