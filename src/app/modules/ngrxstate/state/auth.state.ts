import { AuthStateModel } from '../models/auth.model';
import { Selector, StateContext, Action, State } from '@ngxs/store';
import { AuthService } from '../../auth/auth.service';
import { Login, Logout, GetProfile, ParseHash, SaveUserInDataBase, PersistAuthCreds } from '../actions/auth.action';
import { produce } from 'immer';
import { UserService } from '../../graphql/services/user.service';

@State<AuthStateModel>({
    name: 'auth',
    defaults: AuthState.defaultState
})
export class AuthState {
    static defaultState: AuthStateModel = {
        accessToken: undefined,
        expiresAt: undefined,
        idToken: undefined,
        profile: undefined
    };

    constructor(private authService: AuthService, private userService: UserService) { }

    @Action(Login)
    login() {
        return this.authService.login();
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {

        this.authService.logout();
    }

    @Action(GetProfile)
    async  getProfile(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        try {
            const profile = await this.authService.getProfile(state.accessToken);
            const nextState = produce(state, (draftState) => Object.assign(draftState, { profile }));
            ctx.setState(nextState);
            ctx.dispatch(new SaveUserInDataBase());
        } catch (e) {
            console.log(GetProfile.type, e);
        }
    }

    @Action(PersistAuthCreds)
    persistAuthCredentials(ctx: StateContext<AuthStateModel>, action: PersistAuthCreds) {
        const authResult = action.payload;
        const expiresAt = (a
            uthResult.expiresIn * 1000) + Date.now();
        const state = ctx.getState();
        const nextState = produce(state, (draftState) => Object.assign(draftState, {
            expiresAt: expiresAt,
            ...authResult
        }));
        ctx.setState(nextState);
    }

    @Action(ParseHash)
    async parseHash(ctx: StateContext<AuthStateModel>, action: ParseHash) {
        const authResult = await this.authService.handleAuthentication();
        ctx.dispatch(new PersistAuthCreds(authResult));
    }

    @Action(SaveUserInDataBase)
    async saveUserInDataBase(ctx: StateContext<AuthStateModel>, action: SaveUserInDataBase) {
        await this.userService.saveUserInDatabase().toPromise();
    }
}
