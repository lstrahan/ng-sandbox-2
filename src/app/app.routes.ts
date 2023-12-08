import { Routes } from '@angular/router';
import { NgxsComponent } from './ngxs/ngxs.component';
import { JsonformsComponent } from './jsonforms/app.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/ngxs', pathMatch: 'full' },
    { path: 'ngxs', component: NgxsComponent },
    { path: 'jsonforms', component: JsonformsComponent }
];
