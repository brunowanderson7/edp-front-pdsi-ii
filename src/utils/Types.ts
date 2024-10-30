export type DateEDP = {
  date: string,
  schedules: string[],
}

export type Model = {
  id: number,
  name: string,
  type: string,
  manufacturer: string,
  voltage: string,
  current: string,
  wires: string,
  class: string,
  constant: string,
}

export type Meter = {
  number: string,
  instalation: string,
  toi: string,
  note: string,
  csd: string,
  customerName: string,
  customerPresent: boolean,
}

export type ScheduleItem = {
  meterNumber: string;
  id: number;
  meterId: string;
  userId: string;
  dateDate: string;
  schedule: string;
  reason: string;
  history: any[];
  updatedAt: string;
  rescheduleReason: {
    SH: number;
    CR: number;
    WS: number;
    DM: number;
  };
  numberOfRemainingReschedules: number;
}

export type GetMeter = {
  id: string,
  number: string,
  status: string
}