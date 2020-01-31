import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgkIconComponent } from './ngk-icon.component';

describe('NgkIconComponent', () => {
  let component: NgkIconComponent;
  let fixture: ComponentFixture<NgkIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgkIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
