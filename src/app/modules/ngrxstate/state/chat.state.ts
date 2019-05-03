import { StateContext, Action, State, NgxsOnInit } from '@ngxs/store';
import { produce } from 'immer';
import { UserService } from '../../graphql/services/user.service';
import { ChatStateModel } from '../models/chat.model';
import { SaveChats, SelectContact, SendMessage, DeleteAllChats, DeleteReceivedChats, SaveContacts } from '../actions/chat.action';
import { ChatService } from '../../graphql/services/chat.service';

@State<ChatStateModel>({
    name: 'chat',
    defaults: ChatState.defaultState
})
export class ChatState implements NgxsOnInit {
    ngxsOnInit(ctx?: StateContext<any>) {
        this.chatService.getChats();
    }

    static defaultState: ChatStateModel = {
        chats: [],
        users: [],
        selectedContact: {
            user_id: 'ramesh1'
        }
    };

    constructor(private chatService: ChatService) { }

    @Action(SaveContacts)
    async saveContacts(ctx: StateContext<ChatStateModel>, action: SaveContacts) {
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.users = action.payload;
        }));
        ctx.setState(nextState);
    }

    @Action(SaveChats)
    saveChats(ctx: StateContext<ChatStateModel>, action: SaveChats) {
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.chats = [...draftState.chats as Array<any>, ...action.payload.filter(x => {

                for (let i = 0; i < draftState.chats.length; i++) {
                    if (x.id === draftState.chats[i].id) { return false; }
                }
                return true;

            }) as Array<any>];
        }));
        ctx.setState(nextState);
        const chats: number[] = action.payload.map(x => x.id);
        ctx.dispatch(new DeleteReceivedChats(chats));
    }


    @Action(SelectContact)
    selectContact(ctx: StateContext<ChatStateModel>, action: SelectContact) {
        const currentState = ctx.getState();
        const nextState = produce(currentState, (draftState => {
            draftState.selectedContact = action.payload;
        }));
        ctx.setState(nextState);
    }



    @Action(DeleteAllChats)
    async deleteAllChats(ctx: StateContext<ChatStateModel>, action: DeleteAllChats) {
        try {
            const result = await this.chatService.deleteAllChats().toPromise();
            const currentState = ctx.getState();
            const nextState = produce(currentState, (draftState => {
                draftState.chats = [];
            }));
            ctx.setState(nextState);
        } catch (e) {
            console.log(e);

        }

    }

    @Action(DeleteReceivedChats)
    async deleteReceivedChats(ctx: StateContext<ChatStateModel>, action: DeleteReceivedChats) {
        try {
            const result = await this.chatService.deleteReceivedChats(action.payload).toPromise();
            console.log(result);
        } catch (e) {
            console.log(e);
        }
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
