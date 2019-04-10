import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../../components/app/app.component';
import { ReadComponent } from '../../components/read/read.component';
import { CreateComponent } from '../../components/create/create.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../../components/login/login.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TutorialState } from '../ngrxstate/state/tutorial.state';
@NgModule({
    declarations: [
        AppComponent,
        ReadComponent,
        CreateComponent,
        LoginComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([TutorialState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [AuthService]
    ,
    bootstrap: [AppComponent]
})
export class AppModule { }
