import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'donut-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="donut-form" (ngSubmit)="handleSubmit(form)" #form="ngForm">
      <label>
        <span>Name</span>
        <input type="text" name="name" class="input" required minlength="5" ngModel #name="ngModel"/>
        @if (name.invalid && name.dirty) {
          @if (name.errors?.['minlength']) {
            <div class="donut-form-error" >Minimum length of a name is 5!</div>
          } @else if (name.errors?.['required']) {
            <div class="donut-form-error">Name is required.</div>
          }
        }
      </label>

      <label>
        <span>Icon</span>
        <select name="icon" class="input input--select" required ngModel>
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>
      </label>

      <label>
        <span>Price</span>
        <input type="number" name="price" class="input" required ngModel />
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            required
            [value]="undefined"
            ngModel
          />
          <span>None</span>
        </label>
        <label>
          <input type="radio" name="promo" required value="new" ngModel />
          <span>New</span>
        </label>
        <label>
          <input type="radio" name="promo" required value="limited" ngModel />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          ngModel
        ></textarea>
      </label>

      <button type="submit" class="btn btn--green" [disabled]="form.invalid">Create</button>

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
      &-error {
        font-size: 12px;
        color: #e66262;
      }
    }
  `,
})
export class DonutFormComponent {
  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];
  
  handleSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
  }
}
