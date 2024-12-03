import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from "../../components/donut-form/donut-form.component";
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [CommonModule, DonutFormComponent],
  template: `
    <div>
      <donut-form [donut]="donut" (create)="onCreate($event)"></donut-form>
    </div>
  `,
  styles: ``,
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  ngOnInit(): void {
    this.donut = {
      id: 'y8z0As',
      name: 'Just Chocolate',
      icon: 'just-chocolate',
      price: 119,
      description: 'For the pure chocoholic.',
    };
  }

  onCreate(donut: Donut) {
    console.log('onCreate', donut);
  }
}
