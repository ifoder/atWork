import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as moment from 'moment';
import { IData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selected: Date | null | undefined;
  _date?: IData;
  startHour: string = '';
  @Input() data?: IData;
  @Output() newDateEvent = new EventEmitter<string>();

  dateClass: MatCalendarCellClassFunction<any> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      const date3 = cellDate.getMonth() + 1;
      const date2 = this._dataServis.getDayOfMonth();

      const date4 = date2.find((e) => date3 == e.m);
      return date4?.data?.find((d) => moment(d.startDate).format('D') == date)
        ? 'example-custom-date-class'
        : '';
    }

    return '';
  };
  date = new FormControl(moment());

  constructor(
    private dateAdapter: DateAdapter<any>,
    private _dataServis: DataService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.selected = moment(this.data.startDate).toDate();
      this._date = this._dataServis.getDate(this.data.startDate!);
      this.date.setValue(moment(this.data.startDate));
    }

    this.dateAdapter.setLocale('uk');
  }
  onClick(event: string) {
    this._date = this._dataServis.getDate(event);
    this.newDateEvent.emit(event);
  }
}
