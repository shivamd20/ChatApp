import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../../components/create/create.component';
import { ReadComponent } from '../../components/read/read.component';
import { ProfileComponent } from '../../components/profile/profile.component';


const routes: Routes = [
    {
        path: '**',
        component: ProfileComponent
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
