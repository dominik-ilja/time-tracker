import { capitalize } from './index';

type Format = 'short' | 'long';
type Case = 'uppercase' | 'lowercase' | 'capitalize';
type Name = 'names';

interface IOptions {
  format: Format;
  case: Case;
};
interface ITime {
  names: {
    long: {
      singular: string;
      plural: string;
    };
    short: {
      singular: string;
      plural: string;
    };
  };
  time_in_minutes: number;
}
interface Cases {
  capitalize: Function,
  lowercase: Function,
  uppercase: Function;
}

/* 
  To add additional times simply add another object to the array
*/
const times: ITime[] = [
  {
    names: {
      long: {
        singular: 'day',
        plural: 'days',
      },
      short: {
        singular: 'd',
        plural: 'd'
      }
    },
    time_in_minutes: 1440
  },
  {
    names: {
      long: {
        singular: 'hour',
        plural: 'hours',
      },
      short: {
        singular: 'h',
        plural: 'h'
      }
    },
    time_in_minutes: 60
  },
  {
    names: {
      long: {
        singular: 'minute',
        plural: 'minutes',
      },
      short: {
        singular: 'm',
        plural: 'm'
      }
    },
    time_in_minutes: 1
  },
];
const cases: Cases = {
  lowercase: function (str: string): string {
    return str.toLowerCase();
  },
  uppercase: function (str: string): string {
    return str.toUpperCase();
  },
  capitalize,
};


export default function numberToDays(num: number, options: IOptions = { format: 'long', case: 'capitalize' }): string {
  const caseFunction = cases[options.case];
  let remainder = num;
  let result = '';

  for (const time of times) {
    const { time_in_minutes, names } = time;
    const formatName = names[options.format];
    const val = Math.floor(remainder / time_in_minutes);
    remainder %= time_in_minutes;

    if (val === 1) {
      result += `${val} ${caseFunction(formatName.singular)} `;
    }
    else if (val > 1) {
      result += `${val} ${caseFunction(formatName.plural)} `;
    }

  }

  // for (const time of times) {
  //   const { time_in_minutes, names } = time;
  //   const val = Math.floor(remainder / time_in_minutes);
  //   remainder %= time_in_minutes;

  //   if (val === 1) {
  //     result += `${ val; } ${ capitalize(names.singular); } `;
  //   }
  //   else if (val > 1) {
  //     result += `${ val; } ${ capitalize(names.plural); } `;
  //   }

  // }

  return result;
};;;;;
