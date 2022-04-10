import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRestoComponent } from './ajout-resto.component';

describe('AjoutRestoComponent', () => {
  let component: AjoutRestoComponent;
  let fixture: ComponentFixture<AjoutRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
