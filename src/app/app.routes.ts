import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'donuts',
        loadComponent: () =>
          import('./admin/containers/donut-list/donut-list.component').then(c => c.DonutListComponent)
      },
      {
        path: 'donuts/new',
        loadComponent: () =>
          import('./admin/containers/donut-single/donut-single.component').then(c => c.DonutSingleComponent),
        data: { isEdit: false }
      },
      {
        path: 'donuts/:id',
        loadComponent: () =>
          import('./admin/containers/donut-single/donut-single.component').then(c => c.DonutSingleComponent),
        data: { isEdit: true }
      },
      { path: '', pathMatch: 'full', redirectTo: 'donuts' }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];
