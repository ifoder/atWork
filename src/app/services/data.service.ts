import { Injectable } from '@angular/core';
import * as moment from 'moment'; // add this 1 of 4
import { DATA } from '../data';
import { IData, IDataDay } from '../models/data';
import { IDataTime } from '../models/time';
import { MomentService } from './moment.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  _data: IData[] = DATA;

  constructor(private _moment: MomentService) {}

  getDate(data: string) {
    let dat: IData;

    this._data.forEach((e) =>
      this._moment.day(e.startDate!) == this._moment.day(data)
        ? (dat = this.getMathData(e))
        : null
    );
    return dat!;
  }

  celkemDates() {
    return this._data.length;
  }

  getMathData(date: IData) {
    let dateTime: IDataTime = this._moment.celkem(date);
    date.dayCelkemHours = dateTime.dayHour + ' ч' + dateTime.dayMinutes + ' м';
    date.dayCelkemMoney = dateTime.dayMoney + ' CZK';
    date.startHour = this._moment.hmm(date.startDate);
    date.endHour = this._moment.hmm(date.endDate);
    date.d = this._moment.DD(date);
    date.celkemMinutes = dateTime.celkemDayMinutes;
    return date;
  }
  getDayOfWeek(): IDataDay[] {
    let week: number[] = [];
    this._data.forEach((w) =>
      !week.includes(moment(w.startDate).isoWeek())
        ? week.push(moment(w.startDate).isoWeek())
        : null
    );

    let daysOfWeek: IDataDay[] = [];
    let days: IData[] = [];
    week.forEach((w) => {
      let minutesWeek = 0;
      days = this._data.filter((v) => moment(v.startDate).isoWeek() == w);
      days.map((d) => (minutesWeek += d.celkemMinutes!));
      daysOfWeek.push({
        w: w,
        data: days,
        weekCelkemHours: this._moment.hoursFromMinutes(minutesWeek),
        weekCelkemMoney: this._moment.celkemMoney(170, minutesWeek) + ' CZK',
      });
    });
    return daysOfWeek;
  }

  getDayOfYear() {
    let year: number[] = [];

    this._data.forEach((y) =>
      !year.includes(moment(y.startDate).year())
        ? year.push(moment(y.startDate).year())
        : null
    );

    let daysOfYear: IDataDay[] = [];
    let days: IData[] = [];

    year.forEach((u) => {
      let minutesYear = 0;
      days = this._data.filter((o) => moment(o.startDate).year() == u);
      days.map((d) => (minutesYear += d.celkemMinutes!));
      daysOfYear.push({
        y: u,
        data: days,
        yearCelkemHours: this._moment.hoursFromMinutes(minutesYear),
        yearCelkemMoney: this._moment.celkemMoney(170, minutesYear) + 'CZK',
      });
    });
    return daysOfYear;
  }

  getDayOfMonth(): IDataDay[] {
    let month = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травенб',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ];
    let m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let daysOfMonth: IDataDay[] = [];

    m.forEach((e) => {
      let days: IData[] = [];
      let minutesMonth = 0;

      this._data.filter((odata) => {
        if (this._moment.M(odata) == e) {
          days.push(this.getMathData(odata));
        }
      });
      days.map((d) => (minutesMonth += d.celkemMinutes!));

      return days.length !== 0
        ? daysOfMonth.push({
            month: month[e - 1],
            m: e,
            data: days,
            monthCelkemHours: this._moment.hoursFromMinutes(minutesMonth),
            monthCelkemMoney:
              this._moment.celkemMoney(170, minutesMonth) + ' CZK',
          })
        : null;
    });

    return daysOfMonth;
  }

  getMathDatas() {
    return null;
  }
}
