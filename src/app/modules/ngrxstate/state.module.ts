import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './state/auth.state';
import { environment } from 'src/environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthModule } from '../auth/auth.module';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ChatState } from './state/chat.state';


@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forRoot([AuthState, ChatState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot(
            {
                key: "auth"
            }
        ),
        NgxsRouterPluginModule.forRoot(),
        AuthModule.forRoot()
    ],

})
export class StateModule {

}
