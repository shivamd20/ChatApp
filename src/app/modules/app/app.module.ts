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
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'src/environments/environment';
import { AuthState } from '../ngrxstate/state/auth.state';
import { MatCardModule } from '@angular/material/card';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
        MatCardModule,
        ParallaxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        NgxsModule.forRoot([TutorialState, AuthState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        NgxsStoragePluginModule.forRoot()
    ],
    providers: [AuthService]
    ,
    bootstrap: [AppComponent]
})
export class AppModule { }
