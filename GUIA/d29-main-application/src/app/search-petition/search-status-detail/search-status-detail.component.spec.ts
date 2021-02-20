import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatusDetailComponent } from './search-status-detail.component';

describe('SearchStatusDetailComponent', () => {
  let component: SearchStatusDetailComponent;
  let fixture: ComponentFixture<SearchStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
