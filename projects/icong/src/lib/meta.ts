export type Icon = XmlIcon | UrlIcon;

export interface XmlIcon {
  name: string;
  xml: string;
}

export interface UrlIcon {
  name: string;
  url: string;
}
