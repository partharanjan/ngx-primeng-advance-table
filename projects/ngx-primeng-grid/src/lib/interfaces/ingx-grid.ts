export enum INgxGridColumnType {
    text = 'text',
    number = 'number',
    switch = 'switch',
    date = 'date',
    action = 'action',
    checkbox = 'checkbox'
}

export class INgxGridColumnProperty {
    customRender: boolean = false;
    pipe: string = null;
}

export interface INgxGridColumn {
    key: string;
    label: string;
    type: INgxGridColumnType;
    sortKey?: string;
    icon?: string;
    color?: string;
    width?: number;
    property: INgxGridColumnProperty;
    cssClass?: string;
}

export interface INgxGridInstance<T> {
    column: INgxGridColumn;
    row: T;
}

export interface INgxGridResult<T> {
    items: T[];
    total: number;
}

export interface INgxGridFilter {
    pageNo: number;
    perPage: number;
    sortField?: string;
    sortOrder?: number;
}

export class INgxGridNumberColumnProperty extends INgxGridColumnProperty {
    pipe: string;
}