import { AuthStateModel } from '../models/auth.model';
import { Selector, StateContext, Action, State } from '@ngxs/store';
import { AuthService } from '../../auth/auth.service';
import { Login, Logout } from '../actions/auth.action';


@State<AuthStateModel>({
    name: 'auth'
})
export class AuthState {

    @Selector()
    static token(state: AuthStateModel) { return state.token; }

    constructor(private authService: AuthService) { }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload: { username } }: Login) {
        return this.authService.login();
    }

    @Action(Logout)
    logout({ setState, getState }: StateContext<AuthStateModel>) {
        return this.authService.logout();
    }
}
