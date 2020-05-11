import { BehaviorSubject } from 'rxjs';

export interface SxIcon {
  name: string;
  url?: string;
  xml?: string;
  size?: string;
}

export interface SxIconSource {
  svg: string;
  size?: string;
}

export interface SxIconCached {
  name: string;
  svg: BehaviorSubject<string | null>;
}
