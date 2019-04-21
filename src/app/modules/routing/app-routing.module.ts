import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from '../app/components/authenticate/authenticate.component';
import { TempComponent } from '../app/components/temp/temp.component';
import { ContactsComponent } from '../app/components/contacts/contacts.component';
import { ChatscreenComponent } from '../app/components/chatscreen/chatscreen.component';
import { ChatComponent } from '../app/components/chat/chat.component';


const routes: Routes = [
    {
        path: 'authorize',
        component: AuthenticateComponent
    },
    {
        path: 'temp',
        component: TempComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path: '**',
        component: ChatscreenComponent
    },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
