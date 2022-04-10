import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRestaurantPageComponent } from './liste-restaurant-page.component';

describe('ListeRestaurantPageComponent', () => {
  let component: ListeRestaurantPageComponent;
  let fixture: ComponentFixture<ListeRestaurantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRestaurantPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
