import { Component, OnInit, inject } from '@angular/core';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'donut-single',
  standalone: true,
  imports: [DonutFormComponent, ToastrModule],
  template: `
    <div>
      <donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"></donut-form>
    </div>
  `,
  styles: ``
})
export class DonutSingleComponent implements OnInit {
  private route = inject(ActivatedRoute); // NOT req'd in imports array
  private router = inject(Router); // NOT req'd in imports array
  private donutService = inject(DonutService);
  private toastr = inject(ToastrService);

  donut!: Donut;
  isEdit!: boolean;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.donutService.readOne(id).subscribe((donut: Donut) => (this.donut = donut));

    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe(donut => this.router.navigate(['admin', 'donuts', donut.id]));
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => {
        this.toastr.success('Donut updated successfully!');
        this.router.navigate(['admin']);
      },
      error: err => this.toastr.error(`Failed to update the donut: \n${err.message}`)
    });
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe({
      next: () => {
        this.toastr.success('Donut deleted successfully!');
        this.router.navigate(['admin']);
      },
      error: err => this.toastr.error(`Failed to delete the donut: \n${err.message}`)
    });
  }
}
