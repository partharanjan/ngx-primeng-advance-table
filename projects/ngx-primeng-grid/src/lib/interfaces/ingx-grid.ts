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
    format?: string = null;
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
    tdClass?: string;
    thClass?: string;
}

export interface INgxGridInstance<T> {
    column: INgxGridColumn;
    row: T;
}

export interface INgxGridResult<T> {
    results: T[];
    total: number;
}

export interface INgxGridFilter {
    pageNo: number;
    perPage: number;
    sortField?: string;
    sortOrder?: number;
}

export class INgxGridDateColumnProperty extends INgxGridColumnProperty {
    type: NgxGridDateType = NgxGridDateType.ticks;
    timeZone: string = null;
}

export enum NgxGridDateType {
    ticks = 'ticks',
    json = 'json',
    str = 'str',
}