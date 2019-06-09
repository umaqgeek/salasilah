export const getTodayDate = () => {
  const todayDate = new Date();
  return todayDate.getFullYear() + '-' + ("0"+parseInt(todayDate.getMonth()+1)).slice(-2) + '-' + ("0"+todayDate.getDate()).slice(-2);
};

export const getCustomDate = (date) => {
  const todayDate = new Date(date);
  return todayDate.getFullYear() + '-' + ("0"+parseInt(todayDate.getMonth()+1)).slice(-2) + '-' + ("0"+todayDate.getDate()).slice(-2);
};

export const getCustomDate2 = (date) => {
  const todayDate = new Date(date);
  return ("0"+todayDate.getDate()).slice(-2) + '/' + ("0"+parseInt(todayDate.getMonth()+1)).slice(-2) + '/' + todayDate.getFullYear();
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

export const getUnixTime = (datetime) => {
    var date = new Date(datetime);
    return date.getTime() / 1000;
}

export const getMonthFromIC = (ic) => {
  ic = ic.substring(0, 6);
  var day = ic.substring(4, 6);
  var month = ic.substring(2, 4);
  var year = ic.substring(0, 2);
  // if year between 00 and 20, assume year 2000-2020. else 1999 and below
  year = parseInt(year) >= 0 && parseInt(year) <= 20 ? '20'+year : '19'+year;
  var date = year + '-' + month + '-' + day + ' 00:00:00';
  var today_timestamp = getUnixTime(new Date());
  var ic_timestamp = getUnixTime(new Date(date));
  var diff = today_timestamp - ic_timestamp;
  return parseInt(diff / 60 / 60 / 24 / 30);
};
