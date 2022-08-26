import { capitalize } from './index';

/* 
  To add additional times simply add another object to the array
*/
const times = [
  {
    names: {
      singular: 'day',
      plural: 'days'
    },
    time_in_minutes: 1440
  },
  {
    names: {
      singular: 'hour',
      plural: 'hours'
    },
    time_in_minutes: 60
  },
  {
    names: {
      singular: 'minute',
      plural: 'minutes'
    },
    time_in_minutes: 1
  },
];

export default function numberToDays(num: number): string {
  let remainder = num;
  let result = '';

  for (const time of times) {
    const { time_in_minutes, names } = time;
    const val = Math.floor(remainder / time_in_minutes);
    remainder %= time_in_minutes;

    if (val === 1) {
      result += `${val} ${capitalize(names.singular)} `;
    }
    else if (val > 1) {
      result += `${val} ${capitalize(names.plural)} `;
    }

  }

  return result;
}
