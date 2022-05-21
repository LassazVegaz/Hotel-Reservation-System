import { Moment } from "moment";

export const dateWithTimeZone = (date: Moment) => {
	const _date = date.toDate();
	const userTimezoneOffset = _date.getTimezoneOffset() * 60000;
	return new Date(_date.getTime() - userTimezoneOffset);
};

export const getBookedDays = (fromDate: Moment, toDate: Moment) => {
	if (fromDate.isValid() && toDate.isValid()) {
		return toDate.diff(fromDate, "days") + 1;
	} else {
		return 0;
	}
};
