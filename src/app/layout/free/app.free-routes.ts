import { Routes } from '@angular/router';
import { FreeLayoutComponent } from './free-layout/free-layout.component';
import { LoginComponent } from '../../components/authentication/login/login.component';

export const freeroutes: Routes = [
    {
        path: '',
        component: FreeLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    }
];
