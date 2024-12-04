import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { DonutFormComponent } from './donut-form.component';
import { Donut } from '../../models/donut.model';
import { By } from '@angular/platform-browser';

describe('DonutFormComponent', () => {
  let component: DonutFormComponent;
  let fixture: ComponentFixture<DonutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, DonutFormComponent], // Correct usage for standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(DonutFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form inputs and bind initial donut values', () => {
    component.donut = {
      name: 'Test Donut',
      icon: 'caramel-swirl',
      price: 2.5,
      description: 'A delicious test donut',
      promo: 'new',
    };
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    const iconSelect = fixture.debugElement.query(By.css('select[name="icon"]')).nativeElement;
    const priceInput = fixture.debugElement.query(By.css('input[name="price"]')).nativeElement;
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea[name="description"]')).nativeElement;

    //because data binding is not bidirectional, setting values to component.donut will not automatically update form fields.
    descriptionTextarea.dispatchEvent(new Event('input'));

    expect(nameInput.value).toBe('Test Donut');
    expect(iconSelect.value.split(': ')[1]).toBe('caramel-swirl');
    expect(priceInput.value).toBe('2.5');
    expect(descriptionTextarea.value).toBe('A delicious test donut');
  });

  it('should emit create event with valid form data on submission', () => {
    const emitSpy = jest.spyOn(component.create, 'emit');
    const initialDonut = {
      name: '',
      icon: '',
      price: 0,
      description: '',
      promo: undefined
    };
    seedForm(initialDonut);

    const formDebugElement = fixture.debugElement.query(By.css('form'));
    const testForm = formDebugElement.injector.get(NgForm);
    testForm.setValue({
      name: 'New Donut',
      icon: 'glazed-fudge',
      price: 3.5,
      description: 'A freshly baked glazed donut',
      promo: 'limited',
    });

    component.handleSubmit(testForm);

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'New Donut',
      icon: 'glazed-fudge',
      price: 3.5,
      description: 'A freshly baked glazed donut',
      promo: 'limited',
    });
  });

  it('should mark all fields as touched if the form is invalid', () => {
    const initialDonut = {
      name: '',
      icon: '',
      price: 0,
      description: '',
      promo: undefined
    };
    seedForm(initialDonut);

    const formDebugElement = fixture.debugElement.query(By.css('form'));
    const testForm = formDebugElement.injector.get(NgForm);

    component.handleSubmit(testForm);
    expect(testForm.controls['name']?.touched).toBeTruthy();
    expect(testForm.controls['icon']?.touched).toBeTruthy();
    expect(testForm.controls['price']?.touched).toBeTruthy();
    expect(testForm.controls['description']?.touched).toBeTruthy();
  });

  it('should reset the form when reset button is clicked', () => {
    const initialDonut: Donut = {
      name: 'Initial Donut',
      icon: 'zesty-lemon',
      price: 2.0,
      description: 'A test donut',
      promo: 'new',
    };
    seedForm(initialDonut);

    component.donut = initialDonut;
    fixture.detectChanges();

    const resetButton = fixture.debugElement.query(By.css('button[type="button"]')).nativeElement;
    resetButton.click();

    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    expect(nameInput.value).toBe('Initial state'); // Reset value from resetForm
  });

  function seedForm(donut: Donut) {
    component.donut = donut;
    fixture.detectChanges();
    const descriptionTextarea = fixture.debugElement.query(By.css('textarea[name="description"]')).nativeElement;
    //because data binding is not bidirectional, setting values to component.donut will not automatically update form fields.
    descriptionTextarea.dispatchEvent(new Event('input'));
  }
});

