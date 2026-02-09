import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptainPopover } from './captain-popover';

describe('CaptainPopover', () => {
  let component: CaptainPopover;
  let fixture: ComponentFixture<CaptainPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptainPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(CaptainPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
