import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { MaterialModule } from '../material/material.module';
import { StateModule } from '../ngrxstate/state.module';
import { AppComponent } from './components/app/app.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
    declarations: [
        AppComponent,
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
