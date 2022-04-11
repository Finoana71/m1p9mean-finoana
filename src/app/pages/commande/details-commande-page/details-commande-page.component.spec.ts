import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommandePageComponent } from './details-commande-page.component';

describe('DetailsCommandePageComponent', () => {
  let component: DetailsCommandePageComponent;
  let fixture: ComponentFixture<DetailsCommandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCommandePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
