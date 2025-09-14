import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipPreview } from './ship-preview';

describe('ShipPreview', () => {
  let component: ShipPreview;
  let fixture: ComponentFixture<ShipPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
