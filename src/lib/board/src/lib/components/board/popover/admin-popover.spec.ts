import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPopover } from './admin-popover';

describe('AdminPopover', () => {
  let component: AdminPopover;
  let fixture: ComponentFixture<AdminPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
