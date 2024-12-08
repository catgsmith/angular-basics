import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'donuts',
                loadComponent: () => import('./admin/containers/donut-list/donut-list.component').then(c => c.DonutListComponent)
            },
            {
                path: 'donut',
                loadComponent: () => import('./admin/containers/donut-single/donut-single.component').then(c => c.DonutSingleComponent)
            },
            { path: '', pathMatch: 'full', redirectTo: 'donuts' },
        ],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin',
    },
    {
        path: '**',
        redirectTo: 'admin',
    },
];