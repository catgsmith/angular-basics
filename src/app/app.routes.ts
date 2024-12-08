import { Routes } from '@angular/router';
import { DonutListComponent } from './admin/containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './admin/containers/donut-single/donut-single.component';

export const appRoutes: Routes = [
    {
      path: 'admin',
      children: [
        { path: 'donuts', component: DonutListComponent },
        { path: 'donut', component: DonutSingleComponent },
      ],
    },
  ];