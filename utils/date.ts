import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc);

export const formatDate = (date: Date | null) => dayjs(date).utc().format('DD-MM-YYYY')
export const dateToISO = (date: Date | null) => dayjs(date).utc(true).toISOString()