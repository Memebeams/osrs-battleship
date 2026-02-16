import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnemyPopover } from './enemy-popover';

describe('EnemyPopover', () => {
  let component: EnemyPopover;
  let fixture: ComponentFixture<EnemyPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(EnemyPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
