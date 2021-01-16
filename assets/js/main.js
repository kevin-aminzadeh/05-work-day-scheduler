var DateTime = luxon.DateTime;

var now = DateTime.local();

// Determine the correct Ordinal Indicator (i.e. "st", "rd" or "th") for given day of the month
function getOrdinalIndicator(num) {
  const suffix = ["th", "st", "nd", "rd"];
  let lastDigit = num.toString().slice(-1);

  // Handle edge cases (i.e. when num == 11, 12 or 13)
  if (num == 11 || num == 12 || num == 13) {
    return suffix[0];
  }

  switch (lastDigit) {
    case "1":
      return suffix[1];
    case "2":
      return suffix[2];
    case "3":
      return suffix[3];
    default:
      return suffix[0];
  }
}

$("#currentDay").text(
  `${now.weekdayLong}, ${now.monthLong} ${now.day}${getOrdinalIndicator(
    now.day
  )} `
);
