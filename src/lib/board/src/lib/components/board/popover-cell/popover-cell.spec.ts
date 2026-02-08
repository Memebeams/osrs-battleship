import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverCell } from './popover-cell';

describe('PopoverCell', () => {
  let component: PopoverCell;
  let fixture: ComponentFixture<PopoverCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverCell],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
