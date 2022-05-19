import { Moment } from "moment";

export const dateWithTimeZone = (date: Moment) => {
	const _date = date.toDate();
	const userTimezoneOffset = _date.getTimezoneOffset() * 60000;
	return new Date(_date.getTime() - userTimezoneOffset);
};
