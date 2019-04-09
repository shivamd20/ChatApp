import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../../components/create/create.component';
import { LoginComponent } from '../../components/login/login.component';
import { ReadComponent } from '../../components/read/read.component';
import { ProfileComponent } from '../../components/profile/profile.component';


const routes: Routes = [
    {
        path: 'authenticate',
        component: CreateComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'profile',
        component: ProfileComponent
    }

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
