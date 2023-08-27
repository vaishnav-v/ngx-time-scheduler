import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { issue } from './timeline-table/timeline-model';
import * as moment from 'moment';

@Directive({
  selector: '[timeLineTd]'
})
export class TimelineTdColorDirective implements OnInit   {
  @Input() issue:issue = null
  @Input() columnDate:moment.Moment = null
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    if(this.issue.startDate.isSame(this.columnDate))this.addclass(CssClassList.PROGRESS)
    if(this.issue.qaDate.isSame(this.columnDate))this.addclass(CssClassList.QA)
    if(this.issue.stagingDate.isSame(this.columnDate))this.addclass(CssClassList.STAGING)
  }
  addclass = (className) =>{
    this.renderer.addClass(this.el.nativeElement, className);
  }
}

export enum  CssClassList{
  PROGRESS='td-progress',
  QA='td-qa',
  STAGING= 'td-staging',
}
