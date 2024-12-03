import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from "../../components/donut-form/donut-form.component";

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [CommonModule, DonutFormComponent],
  template: `
    <div>
      <donut-form></donut-form>
    </div>
  `,
  styles: ``,
})
export class DonutSingleComponent {}
