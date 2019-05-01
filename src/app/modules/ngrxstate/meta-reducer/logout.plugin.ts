import { getActionTypeFromInstance } from '@ngxs/store';
import { Logout } from '../actions/auth.action';
import { AuthState } from '../state/auth.state';
import { ChatState } from '../state/chat.state';

export function logoutPlugin(state, action, next) {

    if (getActionTypeFromInstance(action) === Logout.type) {
        state = {
            chats: ChatState.defaultState,
            auth: AuthState.defaultState
        };
    }
    return next(state, action);
}
