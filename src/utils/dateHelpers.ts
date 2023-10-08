import moment from "moment";
export const getTomorrowDate = function () {
  const tomorrowDate = moment().add(1, "days");
  const standardTime = new Date(tomorrowDate.unix() * 1000);
  const standardFormatDate = tomorrowDate.format();
  return { standardTime, standardFormatDate };
};
