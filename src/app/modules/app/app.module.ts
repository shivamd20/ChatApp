import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { MaterialModule } from '../material/material.module';
import { StateModule } from '../ngrxstate/state.module';
import { AppComponent } from './components/app/app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { GraphQLModule } from '../graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TempComponent } from './components/temp/temp.component';
import { UserService } from '../graphql/services/user.service';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ChatscreenComponent } from './components/chatscreen/chatscreen.component';
import { ChatscreencontainerComponent } from './components/chatscreencontainer/chatscreencontainer.component';
import { ChatComponent } from './components/chat/chat.component';
import { MomentModule } from 'ngx-moment';
import { LandingComponent } from './components/landing/landing.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../../environments/environment';
@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        AuthenticateComponent,
        TempComponent,
        ContactsComponent,
        ChatscreenComponent,
        ChatscreencontainerComponent,
        ChatComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        StateModule,
        GraphQLModule,
        HttpClientModule,
        MomentModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ]
    ,
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
