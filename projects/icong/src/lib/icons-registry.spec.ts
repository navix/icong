import { of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { IconsRegistry } from './icons-registry';

describe('IconsRegistry', () => {
  let service: IconsRegistry;
  let http: HttpStub;

  beforeEach(() => {
    http = new HttpStub();
    service = new IconsRegistry(http as any);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('add()', () => {
    it('should add single xml icon', () => {
      service.add({
        name: 'TEST_XML',
        xml: 'XML_CONTENT',
      });
      expect(service.icons).toEqual([
        {
          name: 'TEST_XML',
          xml: 'XML_CONTENT',
          url: undefined,
          requested: false,
        },
      ]);
    });

    it('should add array of xml icons', () => {
      service.add([
        {
          name: 'TEST_XML_1',
          xml: 'XML_CONTENT_1',
        },
        {
          name: 'TEST_XML_2',
          xml: 'XML_CONTENT_2',
        },
      ]);
      expect(service.icons).toEqual([
        {
          name: 'TEST_XML_1',
          xml: 'XML_CONTENT_1',
          url: undefined,
          requested: false,
        },
        {
          name: 'TEST_XML_2',
          xml: 'XML_CONTENT_2',
          url: undefined,
          requested: false,
        },
      ]);
    });

    it('should add xml icon sequentially', () => {
      service.add({
        name: 'TEST_XML_1',
        xml: 'XML_CONTENT_1',
      });
      service.add({
        name: 'TEST_XML_2',
        xml: 'XML_CONTENT_2',
      });
      expect(service.icons).toEqual([
        {
          name: 'TEST_XML_1',
          xml: 'XML_CONTENT_1',
          url: undefined,
          requested: false,
        },
        {
          name: 'TEST_XML_2',
          xml: 'XML_CONTENT_2',
          url: undefined,
          requested: false,
        },
      ]);
    });

    it('should add url icon', () => {
      service.add({
        name: 'TEST_URL',
        url: 'URL',
      });
      expect(service.icons).toEqual([
        {
          name: 'TEST_URL',
          xml: undefined,
          url: 'URL',
          requested: false,
        },
      ]);
    });
  });

  describe('req()', () => {
    it('should request xml icon', done => {
      service.add({
        name: 'TEST_REQ',
        xml: 'XML_CONTENT',
      });
      service
        .reqIcons$
        .pipe(
          take(2),
          toArray(),
        )
        .subscribe(res => {
          expect(res).toEqual([
            [],
            [
              {
                name: 'TEST_REQ',
                xml: 'XML_CONTENT',
                url: undefined,
                requested: true,
              },
            ],
          ]);
          done();
        });
      service.req('TEST_REQ');
    });

    it('should load and request url icon', done => {
      service.add({
        name: 'TEST_REQ',
        url: 'URL',
      });
      const spy = spyOn(http,'get').and.returnValue(of('XML_CONTENT') as any);
      service
        .reqIcons$
        .pipe(
          take(2),
          toArray(),
        )
        .subscribe(res => {
          expect(res).toEqual([
            [],
            [
              {
                name: 'TEST_REQ',
                xml: 'XML_CONTENT',
                url: 'URL',
                requested: true,
              },
            ],
          ]);
          expect(spy).toHaveBeenCalledWith('URL', {responseType: 'text'});
          done();
        });
      service.req('TEST_REQ');
    });
  });
});

class HttpStub {
  get(...args: any) {
  }
}
