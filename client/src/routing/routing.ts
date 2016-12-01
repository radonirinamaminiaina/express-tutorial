import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from 'app/user-list/user-list.component';
import { EditUserComponent } from 'app/edit-user/edit-user.component';
import { HomeComponent } from 'app/home/home.component';

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    }, {
        path: 'user',
        component: UserListComponent
    }, {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'   
    }, {
        path: 'user/edit/:id',
        component: EditUserComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);