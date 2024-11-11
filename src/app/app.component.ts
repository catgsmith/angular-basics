import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonutListComponent } from './admin/containers/donut-list/donut-list.component';

@Component({
  standalone: true,
  imports: [RouterModule, DonutListComponent],
  selector: 'app-root',
  template: `
    <div class="app">
      <donut-list></donut-list>
    </div>
  `,
  styles: [
    `
        .app {
            margin-top: 50px;
            font-size: 22px;
            color: #fff;
            text-align: center;
        }
    `,
  ],
})
export class AppComponent {
  title = 'angular-basics';
}
