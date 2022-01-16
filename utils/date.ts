import dayjs from "dayjs";
let utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const formatDate = (date: string) => dayjs(date).utc().format('DD-MM-YYYY')
export const dateToISO = (date: string) => dayjs(date).utc(true).toIsoString()