import { StateContext, Action, State } from '@ngxs/store';
import { produce } from 'immer';
import { UserService } from '../../graphql/services/user.service';
import { ChatStateModel } from '../models/chat.model';
import { GetContacts, SaveChats, SelectContact, SendMessage } from '../actions/chat.action';
import { ChatService } from '../../graphql/services/chat.service';

@State<ChatStateModel>({
    name: 'chat',
    defaults: {
        chats: [],
        users: [],
        selectedContact: 'ramesh1'
    }
})
export class ChatState {

    constructor(private userService: UserService, private chatService: ChatService) { }

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


    @Action(SendMessage)
    async SendMessage(ctx: StateContext<any>, action: SendMessage) {
        const currentState = ctx.getState();
        console.log(currentState);

        await this.chatService.sendMessage(action.payload, currentState.auth.profile.sub, currentState.chat.selectedContact).toPromise();
    }
}
