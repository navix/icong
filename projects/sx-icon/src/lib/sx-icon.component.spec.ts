import { Component, Injectable, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { SxIconsRegistry } from './sx-icons-registry';
import { SxIconComponent } from './sx-icon.component';

describe('KitIconComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let icon: SxIconComponent;
  let registry: RegistryMock;
  // setup
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestComponent,
        SxIconComponent,
      ],
      providers: [
        {
          provide: SxIconsRegistry,
          useClass: RegistryMock,
        },
      ],
    }).compileComponents(),
  ));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    icon = fixture.componentInstance.icon;
    registry = TestBed.get(SxIconsRegistry);
  });
  it('should be created', () => {
    expect(icon).toBeTruthy();
  });
  it('should get observable from registry', () => {
    const spy = spyOn(registry, 'get').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('icon-name');
  });
  // @todo should re-render on changes
});

@Injectable()
class RegistryMock {
  get(name: string) {
    return from([{svg: '<svg></svg>'}]);
  }
}

@Component({
  selector: 'test-cmp',
  template: `
    <kit-icon name="icon-name"></kit-icon>
  `,
})
class TestComponent {
  @ViewChild(SxIconComponent, /* TODO: add static flag */ {}) icon: SxIconComponent;
}
