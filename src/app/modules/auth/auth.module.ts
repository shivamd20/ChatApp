import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: []
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [AuthService]
        };
    }
}
