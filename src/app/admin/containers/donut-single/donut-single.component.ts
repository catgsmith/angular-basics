import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from "../../components/donut-form/donut-form.component";
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [CommonModule, DonutFormComponent],
  template: `
    <div>
      <donut-form (create)="onCreate($event)"></donut-form>
    </div>
  `,
  styles: ``,
})
export class DonutSingleComponent {

  onCreate(donut: Donut) {
    console.log('Create Donut', donut);
  }
}
