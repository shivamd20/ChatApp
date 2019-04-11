import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material/material.module';
import { StateModule } from '../ngrxstate/state.module';
import { AppComponent } from './components/app/app.component';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
    declarations: [
        AppComponent,
        ReadComponent,
        CreateComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        StateModule
    ]
    ,
    bootstrap: [AppComponent]
})
export class AppModule { }
