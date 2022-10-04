import { Injectable } from '@angular/core';
import * as moment from 'moment'; // add this 1 of 4
import { IData } from '../models/data';
import { IDataTime } from '../models/time';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  constructor() {
    moment.locale('uk');
  }

  hmm(date?: string) {
    return moment(date).format('h:mm');
  }
  ss() {
    return moment().format('ss');
  }

  dayOfWeek() {
    return moment().format('dddd');
  }

  mmm() {
    return moment().format('D MMMM');
  }

  day(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  hour(date: string) {
    return moment(date).format('HH:mm');
  }

  hoursFromMinutes(min: number) {
    return Math.trunc(min / 60) + ' ч ' + (min % 60) + ' м';
  }

  celkemMoney(bet: number, celkemMinutes: number) {
    return bet ? (celkemMinutes / 60) * bet : undefined;
  }

  celkem(date: IData): IDataTime {
    let dayTime: IDataTime;
    let startTime =
      Number(moment(date.startDate).format('H')) * 60 +
      Number(moment(date.startDate).format('m'));
    let endTime =
      Number(moment(date.endDate).format('H')) * 60 +
      Number(moment(date.endDate).format('m'));
    let celkemMinutes = endTime - startTime;
    let cHour = Math.trunc(celkemMinutes / 60);
    let cMinutes = celkemMinutes % 60;
    let dayMoney = date.bet ? (celkemMinutes / 60) * date.bet : undefined;

    dayTime = {
      celkemDayMinutes: celkemMinutes,
      dayHour: cHour,
      dayMinutes: cMinutes,
      dayMoney: dayMoney,
    };

    return dayTime;
  }

  MMMM(date: string) {
    return moment(date).format('MMMM');
  }
  M(date: IData): Number {
    return Number(moment(date.startDate).format('M'));
  }
  DD(date: IData) {
    return moment(date.startDate).format('DD');
  }
}
