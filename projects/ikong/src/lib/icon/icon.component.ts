import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { IconsRegistry } from '../icons-registry';
import { IconSource } from '../meta';

/**
 * Component for rendering svg icon.
 */
@Component({
  selector: 'svg[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges, OnDestroy {
  /**
   * Name in the registry.
   */
  @Input() icon: string;

  /**
   * A11y title.
   */
  @Input() title: string;

  /**
   * A11y description.
   */
  @Input() desc: string;

  titleId = '';

  descId = '';

  @HostBinding('attr.role') roleBind = 'img';

  /**
   * Load and render icon only when visible.
   */
    // @Input() intersectionLoad = false;

  source: IconSource;

  private destroy = new Subject<void>();

  private svg: SVGElement;

  private nameChanges = new Subject<string>();

  constructor(
    private registry: IconsRegistry,
  ) {
    // Handle icon displayed by name
    this.nameChanges
      .pipe(
        takeUntil(this.destroy),
        filter(name => !!name),
        // switchMap(name => {
        //   // Debounce icon load until being visible (if needed).
        //   return this.intersectionLoad
        //     ? this.intersection.observe().pipe(
        //       filter(Boolean),
        //       take(1),
        //       mapTo(name),
        //     )
        //     : from([name]);
        // }),
        switchMap((name: string) => this.registry.get(name)),
      )
      .subscribe((source: IconSource) => {
        this.source = source;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('name' in changes) {
      this.nameChanges.next(this.icon);
    }
    if ('title' in changes || 'desc' in changes) {
      this.updateA11y();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  @HostBinding('attr.aria-labelledby') get ariaLabelledbyBind() {
    return this.titleId + ' ' + this.descId;
  }

  private updateA11y() {
    this.titleId = this.title ? this.uuid() : '';
    this.descId = this.desc ? this.uuid() : '';
  }

  /**
   * Random id generator.
   *
   * Generates GUID-like string, does not follow RFC4122.
   */
  private uuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
