import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { IDataDay, IDataView, IDataViewDates } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dayOfMonth?: IDataDay[];
  dateViewType: 'day' | 'week' | 'month' | 'year' = 'day';
  dataView?: IDataView[] = [];

  constructor(public dialog: MatDialog, private _dataServis: DataService) {}

  openDialog(data: any) {
    this.dialog.open(ModalComponent, { data });
  }

  ngOnInit(): void {
    this.view();
  }

  view() {
    this.dayOfMonth = this._dataServis.getDayOfMonth();
    this.dataView = [];
    switch (this.dateViewType) {
      case 'day':
        this.dayOfMonth.map((e) => {
          const dat: IDataViewDates[] = [];
          e.data?.map((o) =>
            dat.push({
              firstItem: o.d,
              secondItem: '1',
              rightBottomItem: o.dayCelkemMoney,
              rightTopItem: o.dayCelkemHours,
              data: o,
            })
          );
          this.dataView?.push({ title: e.month, view: dat });
        });
        break;
      case 'month':
        let view: IDataViewDates[] = [];
        this.dayOfMonth.map((e) => {
          view.push({
            firstItem: e.month,
            secondItem: e.data?.length.toString(),
            rightTopItem: e.monthCelkemHours,
            rightBottomItem: e.monthCelkemMoney,
          });
        });
        this.dataView?.push({
          title: moment().year().toString(),
          view: view,
        });
        break;
      case 'week':
        let weekdays: IDataViewDates[] = [];
        this._dataServis.getDayOfWeek().forEach((w) =>
          weekdays.push({
            firstItem: w.w?.toString(),
            secondItem: w.data?.length.toString(),
            rightTopItem: w.weekCelkemHours,
            rightBottomItem: w.weekCelkemMoney,
          })
        );
        this.dataView?.push({
          title: '2022',
          view: weekdays,
        });
        break;
      case 'year':
        let yeardays: IDataViewDates[] = [];
        this._dataServis.getDayOfYear().forEach((w) =>
          yeardays.push({
            firstItem: w.y?.toString(),
            secondItem: w.data?.length.toString(),
            rightTopItem: w.yearCelkemHours,
            rightBottomItem: w.yearCelkemMoney,
          })
        );
        this.dataView?.push({
          title: ' ',
          view: yeardays,
        });
        break;
    }
  }
}
