// "8/29/2022, 7:12:24 PM" -> "8-29-2022 7:12"
export default function formatLocalString(date: Date) {
  const items = date.toLocaleString().split(' ');
  const isMorning = items[2] === 'AM';
  const digits = items[1].split(':');
  const dates = items[0].replace(',', '').split('/');
  const hour = Number.parseInt(digits[0]);
  const cycleHours = 12;
  let militaryHour: number;

  if (isMorning) {
    militaryHour = hour === cycleHours ? hour - cycleHours : hour;
  }
  else {
    militaryHour = hour === cycleHours ? hour : hour + cycleHours;
  }

  digits[0] = militaryHour < 10 ? '0' + militaryHour.toString() : militaryHour.toString();

  return `${dates[2]}-${dates[0]}-${dates[1]} ${digits[0]}:${digits[1]}`;
}
