import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from "../../components/donut-form/donut-form.component";
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

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

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    const id = 'zzz'; // Does not exist 'ae098s';
    this.donut = this.donutService.donuts.find(
      (donut: Donut) => donut.id === id
    ) || { name: '', icon: '', price: 0, description: '' };
  }

  onCreate(donut: Donut) {
    console.log('onCreate', donut);
  }
}
