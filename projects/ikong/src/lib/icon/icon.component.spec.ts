import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsRegistry } from '../icons-registry';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;
  let ir: IconsRegistryStub;

  beforeEach(async () =>
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        IconComponent,
      ],
      providers: [
        {
          provide: IconsRegistry,
          useClass: IconsRegistryStub,
        },
      ],
    }).compileComponents(),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    ir = TestBed.inject(IconsRegistry);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should request on name change', () => {
    const spy = spyOn(ir, 'req');
    component.icon = 'ICON';
    component.ngOnChanges({icon: 'ICON'} as any);
    expect(spy).toHaveBeenCalledWith('ICON');
  });
});

@Injectable()
class IconsRegistryStub {
  req(name: string) {
  }
}
