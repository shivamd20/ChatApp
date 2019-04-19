import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatListModule
    ]
})
export class MaterialModule { }
