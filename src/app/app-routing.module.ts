import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './login/login.component';
import { ReadComponent } from './read/read.component';
import { UserComponent } from './user/user.component';


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
        component: UserComponent
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
