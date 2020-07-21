import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[gridTemplate]',
    host: {}
})
export class GridCustomTemplate {

    @Input('gridTemplate') name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}