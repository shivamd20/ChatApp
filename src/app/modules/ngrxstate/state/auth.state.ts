import { AuthStateModel } from '../models/auth.model';
import { Selector, StateContext, Action, State } from '@ngxs/store';
import { AuthService } from '../../auth/auth.service';
import { Login, Logout, SaveAuthData, ClearAuth, GetProfile, ParseHash, SaveUserInDataBase } from '../actions/auth.action';
import { produce } from 'immer';
import { UserService } from '../../graphql/services/user.service';

@State<AuthStateModel>({
    name: 'auth'
})
export class AuthState {

    @Selector()
    static token(state: AuthStateModel) { return state.accessToken; }

    constructor(private authService: AuthService, private userService: UserService) { }

    @Action(Login)
    login() {
        return this.authService.login();
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {

        this.authService.logout();
        ctx.dispatch(ClearAuth);
    }

    @Action(ClearAuth)
    clearAuth(ctx: StateContext<AuthStateModel>) {
        ctx.setState({
            accessToken: undefined,
            expiresAt: undefined,
            idToken: undefined,
            profile: undefined
        });
    }

    @Action(SaveAuthData)
    saveAuthData(ctx: StateContext<AuthStateModel>, action: SaveAuthData) {
        const state = ctx.getState();
        const nextState = produce(state, (draftState) => Object.assign(draftState, { ...action.payload }));
        ctx.setState(nextState);
        ctx.dispatch(new SaveUserInDataBase());
    }

    @Action(GetProfile)
    async  getProfile(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        try {
            const profile = await this.authService.getProfile(state.accessToken);

            const nextState = produce(state, (draftState) => Object.assign(draftState, { profile }));

            ctx.setState(nextState);
        }
        catch (e) {
            console.log(GetProfile.type, e);
        }
    }

    @Action(ParseHash)
    parseHash(ctx: StateContext<AuthStateModel>, action: ParseHash) {
        this.authService.handleAuthentication();
    }

    @Action(SaveUserInDataBase)
    saveUserInDataBase(ctx: StateContext<AuthStateModel>, action: ParseHash) {
        this.userService.saveUserInDatabase();
    }
}
