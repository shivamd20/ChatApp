import { AuthStateModel } from '../models/auth.model';
import { Selector, StateContext, Action, State } from '@ngxs/store';
import { AuthService } from '../../auth/auth.service';
import { Login, Logout, SaveAuthData } from '../actions/auth.action';


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
    logout({ }: StateContext<AuthStateModel>) {
        return this.authService.logout();
    }

    @Action(SaveAuthData)
    saveAuthData(ctx: StateContext<AuthStateModel>, action: SaveAuthData) {
        const state = ctx.getState();
        ctx.setState(
            {
                ...state,
                ...action.payload
            }
        );
    }
}
