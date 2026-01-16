import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieIngredientsChart } from './pie-ingredients-chart';

describe('PieIngredientsChart', () => {
  let component: PieIngredientsChart;
  let fixture: ComponentFixture<PieIngredientsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieIngredientsChart]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PieIngredientsChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
