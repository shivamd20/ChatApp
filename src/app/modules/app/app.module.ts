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
@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        AuthenticateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        StateModule,
        GraphQLModule,
        HttpClientModule
    ]
    ,
    bootstrap: [AppComponent]
})
export class AppModule { }
