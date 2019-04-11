import { AuthStateModel } from '../models/auth.model';
import { Selector, StateContext, Action, State } from '@ngxs/store';
import { AuthService } from '../../auth/auth.service';
import { Login, Logout, SaveAuthData, ClearAuth, GetProfile, ParseHash } from '../actions/auth.action';


@State<AuthStateModel>({
    name: 'auth'
})
export class AuthState {

    @Selector()
    static token(state: AuthStateModel) { return state.accessToken; }

    constructor(private authService: AuthService) { }

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
        ctx.patchState({ ...action.payload });
    }

    @Action(GetProfile)
    async  getProfile(ctx: StateContext<AuthStateModel>, action: GetProfile) {
        const state = ctx.getState();
        try {
            const profile = await this.authService.getProfile(state.accessToken);
            ctx.setState(
                {
                    ...state,
                    profile: profile
                }
            );
        }
        catch (e) {
            console.log(GetProfile.type, e);
        }
    }

    @Action(ParseHash)
    parseHash(ctx: StateContext<AuthStateModel>, action: GetProfile) {
        this.authService.handleAuthentication();
    }
}
