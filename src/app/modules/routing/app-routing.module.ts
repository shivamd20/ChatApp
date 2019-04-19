import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from '../app/components/authenticate/authenticate.component';
import { TempComponent } from '../app/components/temp/temp.component';


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
        path: '**',
        redirectTo: '/'
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
