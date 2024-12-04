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
      <donut-form [donut]="donut" (create)="onCreate($event)" (update)="onUpdate($event)"></donut-form>
    </div>
  `,
  styles: ``,
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donut = this.donutService.readOne('ae098s');
  }

  onCreate(donut: Donut) {
    console.log('onCreate', donut);
    this.donutService.create(donut);
  }
  onUpdate(donut: Donut) {
    console.log('onUpdate', donut);
    this.donutService.update(donut);
    this.donut = donut;
  }
}
