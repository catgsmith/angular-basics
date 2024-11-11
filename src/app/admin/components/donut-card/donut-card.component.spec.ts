import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutCardComponent } from './donut-card.component';
import { Donut } from '../../models/donut.model';


describe('DonutCardComponent', () => {
  let component: DonutCardComponent;
  let fixture: ComponentFixture<DonutCardComponent>;

  const donut: Donut = {
    id: '1',
    name: 'Chocolate Donut',
    icon: 'chocolate',
    price: 250,
    promo: true,
    description: 'A delicious chocolate donut'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutCardComponent);
    component = fixture.componentInstance;
    component.donut = donut;  // Set the donut input here
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
