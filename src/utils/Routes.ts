import { report } from "process";

export const Routes = {
  addmodel: "/menu/model/add",
  adddate: "/menu/dates/add",
  edtidate: "/menu/dates/edit",
  login: "/",
  signup: "/signup",
  check: (email: string) => `/signup/check?email=${email}`,
  wait: "/signup/check/wait",
  menu: "/menu",
  dates: "/menu/dates",
  approve: "/menu/approve",
  reset: "/password-reset",
  resetCheck: (email: string) => `/password-reset/check?email=${email}`,

  schedule: "/menu/schedule",
  reschedule: "/menu/reschedule",

  receive: "/menu/receive",
  receiveStatus: (id: string) => `/menu/receive/status?id=${id}`,

  reports: "/menu/reports",
  generate: "/menu/reports/generate",
};

export default Routes;
