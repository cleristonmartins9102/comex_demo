export interface ElementConfig {
    config: Element;
}

export interface Element {
    element: Option;
}

export interface Option {
    option: Style;
}

export interface Style {
    style: string;
    legend: string;
    id: string;
}
