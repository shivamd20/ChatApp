import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TutorialState } from './state/tutorial.state';
import { AuthState } from './state/auth.state';
import { environment } from 'src/environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthModule } from '../auth/auth.module';


@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forRoot([TutorialState, AuthState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot(
        ),
        AuthModule.forRoot()
    ],

})
export class StateModule {

}
