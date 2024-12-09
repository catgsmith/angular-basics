import { Component, OnInit, inject } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Donut } from '../../models/donut.model';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { DonutService } from '../../services/donut.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'donut-list',
  standalone: true,
  imports: [RouterModule, DonutCardComponent],
  template: `
    <div class="donut-list-actions">
      <a routerLink="new" class="btn btn--green">
        New Donut
        <img src="/assets/img/icon/plus.svg" alt="Add new donut" />
      </a>
    </div>
    @for (donut of donuts; track donut.id) {
    <donut-card [donut]="donut"></donut-card>
    } @empty {
    <span>No Donuts here...</span>
    }
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  private donutService = inject(DonutService);

  donuts!: Donut[];

  ngOnInit(): void {
    this.donutService
      .read()
      .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
