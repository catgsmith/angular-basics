import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'donut-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="donut-form" #form="ngForm">
      <label>
        <span>Name</span>
        <input type="text" name="name" class="input" ngModel />
      </label>
      <label>
        <span>Price</span>
        <input type="number" name="price" class="input" ngModel />
      </label>

      <div class="donut-form-radios">
      <p class="donut-form-radios-label">Promo:</p>
      <label>
        <input type="radio" name="promo" [value]="undefined" ngModel />
        <span>None</span>
      </label>
      <label>
        <input type="radio" name="promo" value="new" ngModel />
        <span>New</span>
      </label>
      <label>
        <input type="radio" name="promo" value="limited" ngModel />
        <span>Limited</span>
      </label>
    </div>


      <pre>{{ form.value | json }}</pre>
    </form>
  `,
  styles: `
  
  .donut-form {
      &-radios {
        display: flex;
        align-content: center;
        &-label {
          margin-right: 10px;
        }
        label {
          display: flex;
          align-items: center;
          span {
            color: #444;
            margin-bottom: 0;
          }
        }
      }
    }
  `,
})
export class DonutFormComponent { }
