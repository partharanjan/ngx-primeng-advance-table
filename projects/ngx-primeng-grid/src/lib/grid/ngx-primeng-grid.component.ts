import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { INgxGridColumnType, INgxGridResult, INgxGridFilter, INgxGridColumn, INgxGridInstance, INgxGridDateColumnProperty, NgxGridDateType } from '../interfaces/ingx-grid';

import { ConfirmationService } from 'primeng/api';
import { DecimalPipe, DatePipe } from '@angular/common';
import { GridCustomTemplate } from '../directives/grid.template';

@Component({
  selector: 'ngx-primeng-grid',
  templateUrl: './ngx-primeng-grid.component.html',
  styleUrls: ['./ngx-primeng-grid.component.scss']
})
export class NgxPrimengGridComponent implements OnInit, AfterContentInit, OnDestroy {

  // templates
  @ContentChildren(GridCustomTemplate) templates: QueryList<GridCustomTemplate>;
  // define column type
  columnType = INgxGridColumnType;
  // store resulsts
  private tableResult: INgxGridResult<any>;
  // define data filter
  dataFilter: INgxGridFilter;
  // store total records
  totalRecords = 0;
  // store selected rows
  selectedRows: any[] = [];
  // store action columns
  actionColumns: INgxGridColumn[] = [];
  // store data columns
  dataColumns: INgxGridColumn[] = [];
  // dialog key
  dialogKey: string;
  // decimal pipe
  private decimalPipe = new DecimalPipe('en-US');
  // date pipe
  private datePipe = new DatePipe('en-US');
  //
  private epochTicks: number = 621355968000000000;

  // key
  @Input() key: string;
  // fire when filter changed
  @Output() filterChanged = new EventEmitter<INgxGridFilter>();
  // when action fire
  @Output() action = new EventEmitter<INgxGridInstance<any>>();
  // on check box selected
  @Output() rowChecked = new EventEmitter<any>();
  // render action columns
  @Input() renderActionColumn: (data: INgxGridInstance<any>) => boolean;
  //  render data columns
  @Input() renderDataColumn: (data: INgxGridInstance<any>) => boolean;
  // pagination
  @Input() pageOptions: number[] = [10, 20, 50];
  // action column name
  @Input() actionColumnName: string = 'Action';
  // enable lazy loading
  @Input() lazy: boolean = true;
  // action view
  @Input() actionView: string = 'block';
  // table style class
  @Input() tableStyleClass: string = 'table table-sm table-wrap card-table';

  // loading
  @Input() loading: boolean = false;
  // load when init
  @Input() initLoad: boolean = false;

  @Input()
  set columns(values: INgxGridColumn[]) {
    if (values && Array.isArray(values)) {
      // get data columns
      this.dataColumns = values.filter(m => m.type !== INgxGridColumnType.action);
      // get action columns
      this.actionColumns = values.filter(m => m.type === INgxGridColumnType.action);
    }
  }

  @Input()
  set result(value: INgxGridResult<any>) {
    if (value) {
      this.selectedRows = [];
      this.tableResult = value;
      this.totalRecords = value.total;
    }
  }

  @Input()
  set filter(value: INgxGridFilter) {
    if (value) {
      // deep clone
      this.dataFilter = this.clone(value);
    }
  }

  // custom template
  customColumnTemplate: TemplateRef<any>;

  constructor(private confirmationService: ConfirmationService) {
    // inti filter
    this.dataFilter = { pageNo: 0, perPage: 10 };
  }

  ngOnInit() {
    // init dialog key
    this.dialogKey = `NgxGrid_${new Date().getTime()}_dialog`;
  }

  ngAfterContentInit() {
    if (this.templates) {
      this.templates.forEach((item) => {
        switch (item.getType()) {
          case 'custom': {
            this.customColumnTemplate = item.template;
          } break;
        }
      });
    }
  }

  private clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }

  // get row values
  get values() {
    return this.tableResult ? this.tableResult.results : [];
  }

  // lazy load
  handleLazyEvent(event: any) {
    if (this.dataFilter && event) {
      // get page Number
      this.dataFilter.pageNo = Number(event.first);
      this.dataFilter.perPage = Number(event.rows);
      // check for sort
      if (event.sortField) {
        this.dataFilter.sortField = event.sortField;
        this.dataFilter.sortOrder = Number(event.sortOrder);
      }
      // emit event
      this.filterChanged.emit(this.dataFilter);
    }
  }

  // handle action
  handleAction(col: INgxGridColumn, row: any) {
    if (col.type == INgxGridColumnType.action && col.key === 'delete') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        key: this.dialogKey,
        accept: () => {
          this.action.emit({ column: col, row });
        }
      });
    } else {
      this.action.emit({ column: col, row });
    }
  }

  // handle when checkbox selected
  handleSelectionChange(event: any) {
    // set selected rows
    this.selectedRows = event;
    // row check event emit
    this.rowChecked.emit(event);
  }

  canRenderActionColumn(column: INgxGridColumn, row: any): boolean {
    if (this.renderActionColumn) {
      return this.renderActionColumn({ column, row });
    }
    return true;
  }

  canRenderDataColumn(column: INgxGridColumn, row: any): boolean {
    if (this.renderDataColumn && column.property.customRender) {
      return this.renderDataColumn({ column, row });
    }
    return true;
  }

  trackByFunction(index: any, item: any) {
    return item[this.key];
  }

  private toFloat(value: any, defValue = 0): number {
    if (value) {
      const v = parseFloat(value);
      if (isNaN(v)) {
        return defValue;
      }
      return v;
    }
    return defValue;
  }

  // get number data
  getNumberView(col: INgxGridColumn, data: any): any {
    if (data) {
      const value = this.toFloat(data);

      return `${this.decimalPipe.transform(value, col.property.format ? col.property.format : '1.2-2')}`;
    }
    return null;
  }

  private ticksToDate(ticks: number): Date {
    if (ticks) {
      const ticksPerMillisecond = 10000;
      const ticksSinceEpoch = ticks - this.epochTicks;
      const millisecondsSinceEpoch = ticksSinceEpoch / ticksPerMillisecond;
      return new Date(millisecondsSinceEpoch);
    }
    return null;
  }

  private isValidDate(date: Date): boolean {
    if (date) {
      return isNaN(date.getTime()) ? false : true;
    }
  }

  getDateView(col: INgxGridColumn, data: any): any {
    if (data) {
      const dtProperty = col.property as INgxGridDateColumnProperty;
      switch (dtProperty.type) {
        case NgxGridDateType.ticks: {
          const ticks = this.toFloat(data);
          if (ticks > 0) {
            const dt = this.ticksToDate(ticks);
            if (this.isValidDate(dt)) {
              return this.datePipe.transform(dt, dtProperty.format, dtProperty.timeZone ? dtProperty.timeZone : undefined);
            }
          }
        } break;
      }
    }
    return null;
  }

  get noRecordColumnSpan(): number {
    return this.dataColumns.length + (this.actionColumns.length > 0 ? 1 : 0);
  }

  ngOnDestroy() {

  }

}
