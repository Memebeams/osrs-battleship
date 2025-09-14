import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipOverlay } from './ship-overlay';

describe('Ship', () => {
  let component: ShipOverlay;
  let fixture: ComponentFixture<ShipOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
