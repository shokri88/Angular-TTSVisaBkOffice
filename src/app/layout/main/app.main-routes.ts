import { Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UsersComponent } from '../../components/authentication/users/users.component';

export const mainroutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'users', component: UsersComponent },
        ]
    }
];
