import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRestoPageComponent } from './ajout-resto-page.component';

describe('AjoutRestoPageComponent', () => {
  let component: AjoutRestoPageComponent;
  let fixture: ComponentFixture<AjoutRestoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRestoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRestoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
