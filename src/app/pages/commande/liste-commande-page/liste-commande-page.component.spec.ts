import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommandePageComponent } from './liste-commande-page.component';

describe('ListeCommandePageComponent', () => {
  let component: ListeCommandePageComponent;
  let fixture: ComponentFixture<ListeCommandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommandePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
