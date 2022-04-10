import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPlatPageComponent } from './ajout-plat-page.component';

describe('AjoutPlatPageComponent', () => {
  let component: AjoutPlatPageComponent;
  let fixture: ComponentFixture<AjoutPlatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPlatPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPlatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
