function formatDate(d) {
  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getToday() {
  var today = new Date();
  var month = "" + (today.getMonth() + 1),
    year = "" + today.getFullYear(),
    day = "" + today.getUTCDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return {
    year: year,
    month: month,
    day: day,
  };
}

const earlier_than_today = (date) => {
  const today = new Date();

  return (
    today.getFullYear() > date.getFullYear() ||
    (today.getFullYear() == date.getFullYear() &&
      today.getUTCMonth() > date.getUTCMonth()) ||
    (today.getFullYear() == date.getFullYear() &&
      today.getUTCMonth() == date.getUTCMonth() &&
      today.getUTCDate() > date.getUTCDate())
  );
};

export default {
  getToday: getToday,
  formatDate: formatDate,
  earlier_than_today: earlier_than_today,
};
