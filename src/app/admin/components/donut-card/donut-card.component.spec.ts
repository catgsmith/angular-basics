import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutCardComponent } from './donut-card.component';
import { Donut } from '../../models/donut.model';
import { By } from '@angular/platform-browser';


describe('DonutCardComponent', () => {
  let component: DonutCardComponent;
  let fixture: ComponentFixture<DonutCardComponent>;

  const donut: Donut = {
    id: '1',
    name: 'Chocolate Donut',
    icon: 'chocolate',
    price: 250,
    promo: 'new',
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

  it('should have correct image src', () => {
    component.donut.icon =  'cherry';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('.donut-card-icon')).nativeElement;
    expect(imgElement.src).toContain('cherry.svg');
  });

  it('donut name should render correctly', () => {
    component.donut.name = 'Chocolate';
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.donut-card-name')).nativeElement;
    expect(nameElement.textContent).toContain('Chocolate');
  });

  test.each([
    ['new', 'NEW'],
    ['limited', 'LIMITED'],
    [undefined, 'Nothing special...']
  ])('should render %s when donut promo is %s', (promo:  any, expectedLabel : any) => {
    component.donut!.promo =  promo;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('.donut-card-label')).nativeElement;
    expect(labelElement.textContent).toContain(expectedLabel);
  });
});
