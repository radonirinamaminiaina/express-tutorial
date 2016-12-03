import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from 'app/user-list/user-list.component';
import { EditUserComponent } from 'app/edit-user/edit-user.component';
import { UserCreateComponent } from 'app/user-create/user-create.component';
import { HomeComponent } from 'app/home/home.component';
import { ProfileComponent } from 'app/profile/profile.component';

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
    }, {
        path: 'user/create',
        component: UserCreateComponent
    }, {
        path: 'user/:username/:id',
        component: ProfileComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);