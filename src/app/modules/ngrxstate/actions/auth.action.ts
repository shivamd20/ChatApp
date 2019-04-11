
export class Login {
    static readonly type = '[Auth] Login';
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class SaveAuthData {
    static readonly type = '[Auth] SaveAuthData';
    constructor(public payload: {
        accessToken,
        idToken,
        expiresAt
    }) { }
}
export class ClearAuth {
    static readonly type = '[Auth] Clear Auth';
}


export class GetProfile {
    static readonly type = '[Auth] GetProfile';
}


export class ParseHash {
    static readonly type = '[Auth] ParseHash';
}
