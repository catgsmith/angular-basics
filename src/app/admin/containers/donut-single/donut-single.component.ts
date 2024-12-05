import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [CommonModule, DonutFormComponent],
  template: `
    <div>
      <donut-form
        [donut]="donut"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></donut-form>
    </div>
  `,
  styles: ``,
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    console.log('DonutSingleComponent');
    this.donutService.readOne('zzz') // Hardcoded id for now - SHOWS EMPTY FORM
    .subscribe((donut: Donut) => this.donut = donut);
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe(() => console.log('onCreate', donut));
  }
  onUpdate(donut: Donut) {
    console.log('onUpdate', donut);
    this.donutService.update(donut);
    this.donut = donut;
  }

  onDelete(donut: Donut) {
    console.log('onDelete', donut);
    this.donutService.delete(donut);
  }

}
