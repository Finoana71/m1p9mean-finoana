import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlivrerComponent } from './alivrer.component';

describe('AlivrerComponent', () => {
  let component: AlivrerComponent;
  let fixture: ComponentFixture<AlivrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlivrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlivrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
