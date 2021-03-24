import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsHostComponent } from './icons-host.component';

describe('IconsHostComponent', () => {
  let component: IconsHostComponent;
  let fixture: ComponentFixture<IconsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
