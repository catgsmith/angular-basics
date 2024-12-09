import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'donut-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (donut) { 
      <form class="donut-form" #form="ngForm">
        <label>
          <span>Name</span>
          <input type="text" name="name" class="input" required minlength="5" [ngModel]="donut.name" 
          [ngModelOptions]="{ updateOn: 'blur' }" #name="ngModel"/>
          @if (name.invalid && name.touched) {
            @if (name.errors?.['minlength']) {
            <div class="donut-form-error" >Minimum length of a name is 5!</div>
            } @else if (name.errors?.['required']) {
            <div class="donut-form-error">Name is required.</div>
            }
          }
        </label>

        <label>
          <span>Icon</span>
          <select name="icon" class="input input--select" required [ngModel]="donut.icon" #icon="ngModel">
            <option *ngFor="let icon of icons" [ngValue]="icon">
              {{ icon }}
            </option>
          </select>
          @if (icon.invalid && icon.touched) {
            @if (icon.errors?.['required']) {
              <div class="donut-form-error">Icon is required.</div>
            }
          }
        </label>

        <label>
          <span>Price</span>
          <input type="number" name="price" class="input" required [ngModel]="donut.price" #price="ngModel"/>
          @if (price.invalid && price.touched) {
            @if (price.errors?.['required']) {
              <div class="donut-form-error">Price is required.</div>
            }
          }
        </label>

        <div class="donut-form-radios">
          <p class="donut-form-radios-label">Promo:</p>
          <label>
            <input type="radio" name="promo" [value]="undefined" [ngModel]="donut.promo" />
            <span>None</span>
          </label>
          <label>
            <input type="radio" name="promo" value="new" [ngModel]="donut.promo" />
            <span>New</span>
          </label>
          <label>
            <input type="radio" name="promo" value="limited" [ngModel]="donut.promo" />
            <span>Limited</span>
          </label>
        </div>

        <label>
          <span>Description</span>
          <textarea name="description" class="input input--textarea" required [ngModel]="donut.description" #description="ngModel"></textarea>
          @if (description.invalid && description.touched && description.errors?.['required']) {
            <div class="donut-form-error">Description is required.</div>
          }
        </label>
        @if (isEdit) {
        <button type="button" class="btn btn--green" [disabled]="form.untouched && form.pristine" (click)="handleUpdate(form)">Update</button>
        <button type="button" class="btn btn--green" (click)="handleDelete()">Delete</button>
        } @else {
          <button type="button" class="btn btn--green" (click)="handleCreate(form)">Create</button>
        }
          
        @if (form.touched || isEdit) {
          <button type="button" class="btn btn--grey" (click)="form.resetForm({ name: 'Initial state'})">Reset Form</button>
        }

        @if (form.valid && form.submitted) {
          <div class="donut-form-working">Working...</div>
        }
      </form>
    } @else {
      <div class="donut-form-error">Loading... </div>
    }
  `,
  styles: [
    `
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
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
      .btn--green:disabled {
        background-color: #ccc;
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input({ required: true }) donut!: Donut;
  @Input({ required: true }) isEdit!: boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({...form.value, id: this.donut.id});
    } else {
      form.form.markAllAsTouched();
    }   
  }
  
  handleDelete() {
    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.delete.emit({ ...this.donut });
    }
  }
}
