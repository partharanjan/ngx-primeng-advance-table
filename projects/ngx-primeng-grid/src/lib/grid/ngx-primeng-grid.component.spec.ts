import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPrimengGridComponent } from './ngx-primeng-grid.component';

describe('NgxPrimengGridComponent', () => {
  let component: NgxPrimengGridComponent;
  let fixture: ComponentFixture<NgxPrimengGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPrimengGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPrimengGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
