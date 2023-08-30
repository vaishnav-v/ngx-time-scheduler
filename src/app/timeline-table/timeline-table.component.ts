import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { HeaderDate, HeaderMonth, ISSUE_LIST, IssueGroupList, issue } from "./timeline-model";
import * as moment from "moment";
import { throttle } from 'lodash';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const timelineStart = moment("01/01/2023", "DD/MM/YYYY");
const timelineEnd = moment("30/03/2023", "DD/MM/YYYY");

const headerFormat = "DD";
const headerMinuteSpan = 60 * 24;

@Component({
  selector: "app-timeline-table",
  templateUrl: "./timeline-table.component.html",
  styleUrls: ["./timeline-table.component.scss"],
})
export class TimelineTableComponent implements OnInit, AfterViewInit {
  @ViewChild("timelineTable", { static: true, read: ElementRef })
  timelineTable: ElementRef;

  @ViewChild("timelineBody", { static: true, read: ElementRef })
  timelineBody: ElementRef;

  headerList: HeaderMonth[] = [];
  ISSUELIST: issue[] = ISSUE_LIST;

  FORMATTED_ISSUES = null

  HEADER_FRAME_MIN = 60 * 24 * 2

  LEFTSIDE_WIDTH = 100

  globalStyle: HTMLStyleElement = null
  constructor() { }



  ngAfterViewInit(): void {
    this.createLine(moment("02/01/2023", "DD/MM/YYYY"));
    this.highlightDateOnMove()

  }


  ngOnInit(): void {
    this.createHeaders();
    this.groupIssues('issueType')
  }

  getMinutesBtwDays(start: moment.Moment, end: moment.Moment) {
    return Math.abs(timelineStart.diff(timelineEnd, "minutes"));
  }
  // createHeaders(){
  //   let tempDate = timelineStart
  //   const endDate = timelineEnd
  //   let index = 0
  //   while (tempDate.isBefore(endDate) || tempDate.isSame(endDate)) {
  //     const header = new Header(index);
  //     header.date = tempDate;
  //     header.label = tempDate.format(headerFormat)
  //     this.headerList.push(header)
  //     tempDate.add(headerMinuteSpan, 'minutes')
  //     index ++
  //   }
  //   console.log(this.headerList);

  // }
  // const moment = require('moment'); // Import the moment library

  createHeaders() {
    let tempDate = timelineStart.clone();
    const endDate = timelineEnd;
    let index = 0

    let currentMonth: HeaderMonth | null = null;

    while (tempDate.isBefore(endDate) || tempDate.isSame(endDate)) {
      if (
        currentMonth === null ||
        tempDate.month() !== currentMonth.dateStart?.month()
      ) {
        const monthLabel = tempDate.format("MMMM YYYY"); // Get month label
        currentMonth = new HeaderMonth(monthLabel);
        currentMonth.dateStart = tempDate.clone().startOf("month");
        currentMonth.dateEnd = tempDate.clone().endOf("month");
        this.headerList.push(currentMonth);
      }

      const headerDate = new HeaderDate(index);
      headerDate.date = tempDate.clone();
      headerDate.label = tempDate.format(headerFormat);
      currentMonth?.headerDateList.push(headerDate);

      tempDate.add(this.HEADER_FRAME_MIN, "minutes");
      index++
    }

    console.log(this.headerList);
  }

  createLine(date: moment.Moment = moment()) {
    const table: HTMLElement = this.timelineTable.nativeElement;
    const line: HTMLDivElement = document.createElement("div");
    const leftTds = this.getNumberOfTds(date);
    const leftPixels: string = (leftTds * 50) + this.LEFTSIDE_WIDTH + ((((60 * 24) / this.HEADER_FRAME_MIN) * 50)/ 2)  + "px";
    console.log((((60 * 24) / this.HEADER_FRAME_MIN) * 50),leftTds );
    
    line.classList.add("line");
    line.style.left = leftPixels;
    table.prepend(line);
  }
  getNumberOfTds(dateToAttach: moment.Moment) {
    const startDate = timelineStart.clone();
    const minuteDiff = Math.abs(startDate.diff(dateToAttach, "minutes"));
    const dayDiff = minuteDiff / (this.HEADER_FRAME_MIN);
    return dayDiff;
  }

  highlightDateOnMove() {
    const TABLE_BODY = this.timelineBody.nativeElement
    const BODY = document.body
    const HEADERS = document.querySelectorAll('.tl-date-th')
    const DELAY = 200

    const MOUSE_MOVE_HANDLE_FUNCTION = throttle((event) => {
      const DISTANCE_X_TO_REMOVE = this.LEFTSIDE_WIDTH
      const TABLE_RECT = TABLE_BODY.getBoundingClientRect()
      const mouseXCord = event.clientX - TABLE_RECT.left;
      const mouseYCord = event.clientY - TABLE_RECT.bottom;
      const pixelsFormLeftOfIssue = mouseXCord - (DISTANCE_X_TO_REMOVE)

      const numberOfColumnsLeftOfIssue = Math.floor(pixelsFormLeftOfIssue / 50)
      const columnsNegativeRemoved = Math.max(numberOfColumnsLeftOfIssue, 0)

      if (HEADERS && (numberOfColumnsLeftOfIssue < 0 || mouseYCord >= -5)) this.removeHeaders()
      else if (HEADERS) this.highLightHeader(columnsNegativeRemoved)

    }, DELAY);

    BODY.addEventListener('mousemove', MOUSE_MOVE_HANDLE_FUNCTION);
  }

  highLightHeader(index) {
    const clasToHighlight = 'tl-date-th-' + index
    const style = `
   .${clasToHighlight}  {
        background-color:red
    }
   `
    this.addGlobalStyle(style)
  }

  removeHeaders() {
    this.setGlobalStyle()
    const styleSheet = this.globalStyle?.sheet; // This is the CSSStyleSheet object
    if (styleSheet.cssRules[0]) styleSheet.deleteRule(0)
  }
  addGlobalStyle(style: string) {
    this.setGlobalStyle()
    const styleSheet = this.globalStyle.sheet;
    if (styleSheet.cssRules[0]) styleSheet.deleteRule(0)
    styleSheet.insertRule(style, 0)
  }
  setGlobalStyle() {
    if (this.globalStyle) return
    this.globalStyle = document.createElement('style');
    document.head.appendChild(this.globalStyle);
  }


  groupIssues(key: string): void {
    let unFormattedIssues = [...this.ISSUELIST]
    let groupedIssue = new IssueGroupList()
    unFormattedIssues.forEach((issue: issue) => {
      groupedIssue.addIssue(issue, ['issueType','priority'])
    })
    console.log(Object.entries(groupedIssue.issuesFormatted));
    this.FORMATTED_ISSUES = Object.entries(groupedIssue.issuesFormatted)

  }



  columnWidthChange(width) {
    console.log(width);

    const LINES = document.querySelectorAll('.line')
    const TABLE = document.querySelector('table')
    LINES.forEach((line: HTMLElement) => {
      const currentWidth = line.getBoundingClientRect().left - TABLE.getBoundingClientRect().left
      const newWidth = currentWidth - this.LEFTSIDE_WIDTH + width
      line.style.left = newWidth + 'px'
    })
    this.LEFTSIDE_WIDTH = width

  }
}
