import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { IData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddComponent implements OnInit {
  hour = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  selected = 7;
  // _date: IData;
  startDate = new FormControl(moment());
  constructor(private _dataServis: DataService) {
    // this._date = this._dataServis.getDate(this.data.startDate!);
  }

  ngOnInit(): void {}

  viewItem(item: string) {
    // this._date = this._dataServis.getDate(item);
  }
}
