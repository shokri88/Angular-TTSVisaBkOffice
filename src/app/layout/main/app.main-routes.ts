import { Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UsersComponent } from '../../components/authentication/users/users.component';
import { AdduserComponent } from '../../components/authentication/adduser/adduser.component';
import { ChangepasswordComponent } from '../../components/authentication/changepassword/changepassword.component';
import { UpdateuserComponent } from '../../components/authentication/updateuser/updateuser.component';
import { NewvisaComponent } from '../../components/visa/newvisa/newvisa.component';
import { VisarequestsComponent } from '../../components/visa/visarequests/visarequests.component';

export const mainroutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'users', component: UsersComponent },
            { path: 'users/adduser', component: AdduserComponent },
            { path: 'changepassword', component: ChangepasswordComponent },
            { path: 'users/updateuser/:id', component: UpdateuserComponent },

            { path: 'visa/newvisa', component: NewvisaComponent },
            { path: 'visa/visarequests', component: VisarequestsComponent },
            { path: 'visa/visarequests/:id', component: VisarequestsComponent },

        ]
    }
];
