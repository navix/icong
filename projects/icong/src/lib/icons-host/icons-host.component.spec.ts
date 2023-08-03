import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { IconsRegistry } from '../icons-registry';
import { IconsHostComponent } from './icons-host.component';

describe('IconsHostComponent', () => {
  let component: IconsHostComponent;
  let fixture: ComponentFixture<IconsHostComponent>;
  let ir: IconsRegistryStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [IconsHostComponent],
        providers: [
          {provide: IconsRegistry, useClass: IconsRegistryStub},
          {provide: DomSanitizer, useClass: SanitizerStub},
        ],
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsHostComponent);
    ir = TestBed.inject(IconsRegistry) as any;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.icons).toEqual([]);
  });

  it('should ignore invalid svg', waitForAsync(() => {
    ir.reqIcons.next([
      {
        name: 'TEST',
        xml: 'XML_CONTENT',
        url: undefined,
        requested: true,
      },
    ]);
    setTimeout(() => {
      expect(component.icons).toEqual([]);
    }, 1);
  }));

  it('should extract icon content (all except <svg>) and fill and viewBox attributes', waitForAsync(() => {
    ir.reqIcons.next([
      {
        name: 'TEST',
        xml: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4C13.6477"></path></svg>',
        url: undefined,
        requested: true,
      },
      {
        name: 'TEST2',
        xml: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" height="24" width="24" stroke="#000"><path d="M12 4C13.6477"></path></svg>',
        url: undefined,
        requested: true,
      },
    ]);
    setTimeout(() => {
      expect(component.icons).toEqual([
        {
          name: 'TEST',
          html: '<path d="M12 4C13.6477"></path>',
          fill: 'currentColor',
          viewBox: '0 0 24 24',
          height: undefined,
          width: undefined,
          stroke: undefined,
        },
        {
          name: 'TEST2',
          html: '<path d="M12 4C13.6477"></path>',
          fill: 'currentColor',
          viewBox: '0 0 24 24',
          height: '24',
          width: '24',
          stroke: '#000',
        },
      ]);
    }, 1);
  }));
});

class IconsRegistryStub {
  reqIcons = new BehaviorSubject<any[]>([]);

  get reqIcons$() {
    return this.reqIcons.asObservable();
  }
}

class SanitizerStub {
  bypassSecurityTrustHtml(value: any) {
    return value;
  }
}
