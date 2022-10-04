import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MomentService } from 'src/app/services/moment.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  ss!: string;
  hmm!: string;
  dayWeek!: string;
  mmmm!: string;

  constructor(private moment: MomentService, public dialog: MatDialog) {
    setInterval(() => {
      this.ss = this.moment.ss();
      this.hmm = this.moment.hmm();
      this.dayWeek = this.moment.dayOfWeek();
      this.mmmm = this.moment.mmm();
    }, 1000); // Updates the time every second.
  }

  openDialog() {
    this.dialog.open(AddComponent);
  }
  ngOnInit(): void {}
}
