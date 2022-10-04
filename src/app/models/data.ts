export interface IData {
  startDate?: string;
  endDate?: string;
  state?: string;
  bet?: number;
  startHour?: string;
  endHour?: string;
  celkemMinutes?: number;
  dayCelkemHours?: string;
  dayCelkemMoney?: string;
  d?: string;
}

export interface IDataDay {
  month?: string;
  w?: number;
  m?: number;
  y?: number;
  monthCelkemHours?: string;
  weekCelkemHours?: string;
  monthCelkemMoney?: string;
  weekCelkemMoney?: string;
  yearCelkemMoney?: string;
  yearCelkemHours?: string;
  data?: IData[];
}

export interface IDataView {
  title?: string;
  view?: IDataViewDates[];
}

export interface IDataViewDates {
  firstItem?: string;
  secondItem?: string;
  rightTopItem?: string;
  rightBottomItem?: string;
  data?: IData;
}
