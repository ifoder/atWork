import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { IData, IDataDay } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent implements OnInit {
  celkemDates: number = 0;
  dayOfWeek: string = '';
  numberOfWeek: number = moment().isoWeek();
  week?: IDataDay;
  month?: IDataDay;
  today: IData = { dayCelkemHours: '0,00ч', dayCelkemMoney: '0 CZK' };

  constructor(
    private dataServise: DataService,
    private momentServise: MomentService,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.celkemDates = this.dataServise.celkemDates();
    this.dayOfWeek = moment(new Date()).format('dddd');
    console.log(moment().weekday());
    this.today = this.dataServise.getDate(moment().toDate().toString());
    if (!this.today)
      this.today = { dayCelkemHours: '0,00ч', dayCelkemMoney: '0 CZK' };
    this.week = this.dataServise
      .getDayOfWeek()
      .find((w) => w.w == this.numberOfWeek);
    this.month = this.dataServise
      .getDayOfMonth()
      .find((w) => w.m == Number(moment(new Date()).format('M')));
    console.log(this.month);
  }
}
