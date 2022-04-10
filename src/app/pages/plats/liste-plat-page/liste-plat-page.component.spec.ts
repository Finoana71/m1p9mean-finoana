import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlatPageComponent } from './liste-plat-page.component';

describe('ListePlatPageComponent', () => {
  let component: ListePlatPageComponent;
  let fixture: ComponentFixture<ListePlatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePlatPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePlatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
