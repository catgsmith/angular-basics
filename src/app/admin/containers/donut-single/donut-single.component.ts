import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [CommonModule, DonutFormComponent, ToastrModule],
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
  constructor(private donutService: DonutService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.donutService.readOne('zzz') // Hardcoded id for now - SHOWS EMPTY FORM
    .subscribe((donut: Donut) => this.donut = donut);
  }

  onCreate(donut: Donut) {
    this.donutService
      .create(donut)
      .subscribe(() => console.log('Created successfully!', donut));
  }
  
  onUpdate(donut: Donut) {
    this.donutService
      .update(donut)
      .subscribe({
        next: () => this.toastr.success('Donut updated successfully!'),
        error: (err) => this.toastr.error(`Failed to update the donut: \n${err.message}`),
      });
  }

  onDelete(donut: Donut) {
    this.donutService
    .delete(donut)
    .subscribe(() => console.log('Deleted successfully!'));
  }

}
