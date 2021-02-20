import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolUsuarioCorpComponent } from './list-sol-usuario-corp.component';

describe('ListSolUsuarioCorpComponent', () => {
  let component: ListSolUsuarioCorpComponent;
  let fixture: ComponentFixture<ListSolUsuarioCorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSolUsuarioCorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolUsuarioCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
