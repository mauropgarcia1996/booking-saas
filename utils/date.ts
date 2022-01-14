import dayjs from "dayjs";

export const formatDate = (date: string) => dayjs(date).format('DD-MM-YYYY HH:MM:ss')