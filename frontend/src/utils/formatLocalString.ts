// "8/29/2022, 7:12:24 PM" -> "8-29-2022 7:12"
export default function formatLocalString(time: string) {
  const items = time.split(' ');
  const isNight = items[2] === 'PM';
  const digits = items[1].split(':');
  const dates = items[0].replace(',', '').split('/');

  if (isNight) {
    const nightTime = Number.parseInt(digits[0]) + 12;
    digits[0] = nightTime === 24 ? '00' : nightTime.toString();
  }

  return `${dates[2]}-${dates[0]}-${dates[1]} ${digits[0]}:${digits[1]}`;
}
