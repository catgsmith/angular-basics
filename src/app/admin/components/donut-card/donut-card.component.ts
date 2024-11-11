import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="donut-card">
      <img src="/assets/img/{{ donut.icon }}.svg"
        [alt]="donut.name"
        class="donut-card-icon"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}
        </p>
        <p class="donut-card-price">
          {{ donut.price }}
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class DonutCardComponent {
  @Input() donut!: Donut;
}