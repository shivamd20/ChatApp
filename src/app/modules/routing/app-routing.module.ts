import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from '../app/components/authenticate/authenticate.component';
import { TempComponent } from '../app/components/temp/temp.component';
import { ContactsComponent } from '../app/components/contacts/contacts.component';
import { ChatscreenComponent } from '../app/components/chatscreen/chatscreen.component';
import { ChatscreencontainerComponent } from '../app/components/chatscreencontainer/chatscreencontainer.component';
import { AuthGuard } from '../auth/authguard.service';


const routes: Routes = [
    {
        path: 'authorize',
        component: AuthenticateComponent
    },
    {
        path: 'temp',
        component: TempComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'chat',
        component: ChatscreencontainerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: ChatscreenComponent,
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
