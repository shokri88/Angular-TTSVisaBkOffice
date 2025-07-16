import { Routes } from '@angular/router';
import { mainroutes } from './layout/main/app.main-routes';
import { freeroutes } from './layout/free/app.free-routes';

export const routes: Routes = [
    ...mainroutes,
    ...freeroutes
];


