/**
 *
 * @param date
 * @returns Data in formato DD/MM/YYYY
 */
export const formatDateDDMMYYYY = (date: Date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [day, month, year].join("/");
};
