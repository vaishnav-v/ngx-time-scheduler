import * as moment from "moment";

export interface issue {
  id: number;
  name: string;
  key: string;
  startDate: moment.Moment | null;
  qaDate: moment.Moment | null;
  stagingDate: moment.Moment | null;
  assignee: string;
  priority: string;
  issueType: string;
}

export interface tableConfig {
  id: number;
  label: string;

}

export type issueFormmatted = { key: IssueList } | {}


export class HeaderDate {
  public label = "";
  public date: moment.Moment | null = null;
  constructor(private id: number) { }
}
export class HeaderMonth {
  public label = "";
  public dateStart: moment.Moment | null = null;
  public dateEnd: moment.Moment | null = null;
  public headerDateList: Array<HeaderDate> = [];
  constructor(private monthLabel: string) {
    this.label = monthLabel;
  }
}

export class IssueList {
  public issueList: issue[] = []
  public addIssue(issueToAdd: issue) {
    this.issueList.push(issueToAdd)
  }
}

export class IssueGroupList {
  public issuesFormatted: issueFormmatted = {}
  public addIssue(issueToAdd: issue, key: string): issueFormmatted {
    const groupingKey = issueToAdd[key]
    if (!this.issuesFormatted[groupingKey]) {
      this.issuesFormatted[groupingKey] = new IssueList();
    }
    this.issuesFormatted[groupingKey].addIssue(issueToAdd);
    return this.issuesFormatted;
  }
}















export const ISSUE_LIST: issue[] = [
  {
    id: 1,
    name: 'Issue 1',
    key: 'ISSUE-1',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'John Doe',
    priority: 'High',
    issueType: 'Bug'
  },
  {
    id: 2,
    name: 'Issue 2',
    key: 'ISSUE-2',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'Jane Smith',
    priority: 'Medium',
    issueType: 'Feature'
  },
  {
    id: 3,
    name: 'Issue 3',
    key: 'ISSUE-3',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'Robert Johnson',
    priority: 'Low',
    issueType: 'Task'
  },
  {
    id: 4,
    name: 'Issue 4',
    key: 'ISSUE-4',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'Alice Williams',
    priority: 'High',
    issueType: 'Bug'
  },
  {
    id: 5,
    name: 'Issue 5',
    key: 'ISSUE-5',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("01/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("26/01/2023", "DD/MM/YYYY"),
    assignee: 'Michael Brown',
    priority: 'Medium',
    issueType: 'Feature'
  },
  {
    id: 6,
    name: 'Issue 6',
    key: 'ISSUE-6',
    startDate: moment("05/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("11/01/2023", "DD/MM/YYYY"),
    assignee: 'Emily Davis',
    priority: 'Low',
    issueType: 'Task'
  },
  {
    id: 7,
    name: 'Issue 7',
    key: 'ISSUE-7',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'William Wilson',
    priority: 'High',
    issueType: 'Bug'
  },
  {
    id: 8,
    name: 'Issue 8',
    key: 'ISSUE-8',
    startDate: moment("03/01/2023", "DD/MM/YYYY"),
    qaDate: moment("06/01/2023", "DD/MM/YYYY"),
    stagingDate: moment("16/01/2023", "DD/MM/YYYY"),
    assignee: 'Olivia Martinez',
    priority: 'Medium',
    issueType: 'Feature'
  },
  {
    id: 9,
    name: 'Issue 9',
    key: 'ISSUE-9',
    startDate: moment('2023-09-05'),
    qaDate: moment('2023-09-20'),
    stagingDate: moment('2023-09-12'),
    assignee: 'James Johnson',
    priority: 'Low',
    issueType: 'Task'
  },
  {
    id: 10,
    name: 'Issue 10',
    key: 'ISSUE-10',
    startDate: moment('2023-09-10'),
    qaDate: moment('2023-09-25'),
    stagingDate: moment('2023-09-18'),
    assignee: 'Sophia Anderson',
    priority: 'High',
    issueType: 'Bug'
  }
];
