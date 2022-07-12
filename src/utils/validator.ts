//to check valid uuid
export function checkValidUUID(str: string) {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}
// for valid the date
export function dateIsValid(dateStr: any) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateStr.match(regex) === null) {
    return false;
  }
  const date = new Date(dateStr);
  const timestamp = date.getTime();
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }
  return date.toISOString().startsWith(dateStr);
}
export function validApptDate(start_date: Date, end_date: Date) {
  let currentDate = new Date();
  let local_start_date = new Date(start_date);
  let local_end_date = new Date(end_date);
  return currentDate <= local_start_date && local_end_date >= local_start_date
    ? true
    : false;
}
export function phone_validation(number: string) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(number);
}
