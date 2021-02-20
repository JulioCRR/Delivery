import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolPeticionesWebComponent } from './list-sol-peticiones-web.component';

describe('ListSolPeticionesWebComponent', () => {
  let component: ListSolPeticionesWebComponent;
  let fixture: ComponentFixture<ListSolPeticionesWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSolPeticionesWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolPeticionesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
