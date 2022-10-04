import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  _date: IData;

  constructor(
    private _dataServis: DataService,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
    this._date = this._dataServis.getDate(this.data.startDate!);
  }

  ngOnInit(): void {}

  viewItem(item: string) {
    this._date = this._dataServis.getDate(item);
  }
}
