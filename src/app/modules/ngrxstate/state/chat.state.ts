import { StateContext, Action, State } from '@ngxs/store';
import { produce } from 'immer';
import { UserService } from '../../graphql/services/user.service';
import { ChatStateModel } from '../models/chat.model';
import { GetContacts, SaveChats, SelectContact } from '../actions/chat.action';

@State<ChatStateModel>({
    name: 'chat',
    defaults: {
        chats: [],
        users: [],
        selectedContact: 'ramesh1'
    }
})
export class ChatState {

    constructor(private userService: UserService) { }

    @Action(GetContacts)
    async getContacts(ctx: StateContext<ChatStateModel>) {
        const result = await this.userService.getContacts();
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.users = result;
        }));
        ctx.setState(nextState);
    }

    @Action(SaveChats)
    saveChats(ctx: StateContext<ChatStateModel>, action: SaveChats) {
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.chats = action.payload;
        }));
        ctx.setState(nextState);
    }


    @Action(SelectContact)
    selectContact(ctx: StateContext<ChatStateModel>, action: SelectContact) {
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.selectedContact = action.payload;
        }));
        ctx.setState(nextState);
    }
}
