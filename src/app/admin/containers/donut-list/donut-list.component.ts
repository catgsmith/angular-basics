import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Donut } from '../../models/donut.model';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'donut-list',
  standalone: true,
  imports: [CommonModule, DonutCardComponent],
  template: `
    @for (donut of donuts; track donut.id) {
      <donut-card [donut]="donut"></donut-card>
    } @empty {
      <span>No Donuts here...</span>
    }
  `,
  styles: [],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService
    .read()
    .subscribe((donuts: Donut[]) => (this.donuts = donuts));
  }
}
