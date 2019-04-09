import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { NgxsModule } from '@ngxs/store';
import { TutorialState } from './state/tutorial.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
@NgModule({
    declarations: [
        AppComponent,
        ReadComponent,
        CreateComponent,
        LoginComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([TutorialState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule
    ],
    providers: [AuthService]
    ,
    bootstrap: [AppComponent]
})
export class AppModule { }
