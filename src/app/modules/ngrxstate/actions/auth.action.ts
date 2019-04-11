
export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string, password: string }) { }
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
