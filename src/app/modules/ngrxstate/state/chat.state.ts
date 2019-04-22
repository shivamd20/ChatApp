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
        selectedContact: {
            user_id: 'ramesh1'
        }
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
            draftState.chats = [...draftState.chats, ...action.payload];
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
    async SendMessage(ctx: StateContext<ChatStateModel>, action: SendMessage) {
        const currentState = ctx.getState();
        const result: any = await this.chatService.sendMessage(action.payload, currentState.selectedContact).toPromise();
        console.log(result.data.insert_chat.returning[0]);
        const nextState = produce(currentState, (draftState => {
            draftState.chats.push(result.data.insert_chat.returning[0]);
        }));

        ctx.setState(nextState);
    }
}
