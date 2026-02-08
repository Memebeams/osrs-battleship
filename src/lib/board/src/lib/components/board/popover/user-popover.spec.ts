import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPopover } from './user-popover';

describe('UserPopover', () => {
  let component: UserPopover;
  let fixture: ComponentFixture<UserPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
