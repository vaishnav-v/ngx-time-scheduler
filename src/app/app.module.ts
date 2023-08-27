import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxTimeSchedulerModule} from '../../projects/ngx-time-scheduler/src/lib/ngx-time-scheduler.module';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineTableComponent } from './timeline-table/timeline-table.component';
import {MatTableModule} from '@angular/material/table';
import { TimelineTdColorDirective } from './timeline-td-color.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CanvasTableComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineTableComponent,
    TimelineTdColorDirective,
    CanvasTableComponent
  ],
  imports: [
    BrowserModule,
    NgxTimeSchedulerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
