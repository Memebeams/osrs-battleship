import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewPageComponent } from './preview-page';

describe('PreviewPageComponent', () => {
  let component: PreviewPageComponent;
  let fixture: ComponentFixture<PreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
