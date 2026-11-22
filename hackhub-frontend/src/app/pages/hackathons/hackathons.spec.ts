import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hacakthons } from './hackathons';

describe('Hacakthons', () => {
  let component: Hacakthons;
  let fixture: ComponentFixture<Hacakthons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hacakthons],
    }).compileComponents();

    fixture = TestBed.createComponent(Hacakthons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
