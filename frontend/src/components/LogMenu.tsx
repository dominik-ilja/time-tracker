import React, { FormEvent, MouseEventHandler, useState } from 'react';
import { Overlay } from './index';
import { ILogFields } from '../types/interfaces';

interface IProps {
  closeListener: MouseEventHandler;
  submitListener(e: FormEvent, info: ILogFields | string): any;
  // categoryId: number;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export default function LogMenu(props: IProps): JSX.Element {
  const date = new Date();
  const [workDays, setWorkDays] = useState('0');
  const [workHours, setWorkHours] = useState('0');
  const [workMinutes, setWorkMinutes] = useState('0');
  const [dateYear, setDateYear] = useState(date.getFullYear().toString());
  const [dateMonth, setDateMonth] = useState((date.getMonth() + 1).toString());
  const [dateDay, setDateDay] = useState(date.getDate().toString());
  const [finishHour, setFinishHour] = useState(date.getHours().toString());
  const [finishMinutes, setFinishMinutes] = useState(date.getMinutes().toString());
  const fields = {
    dateDay,
    dateMonth,
    dateYear,
    finishHour,
    finishMinutes,
    workDays,
    workHours,
    workMinutes,
  };

  function checkFields(): ILogFields {
    const dateYear = Number.parseInt(fields.dateYear);
    const dateMonth = Number.parseInt(fields.dateMonth);
    const dateDay = Number.parseInt(fields.dateDay);
    const finishHour = Number.parseInt(fields.finishHour);
    const finishMinutes = Number.parseInt(fields.finishMinutes);
    const workDays = Number.parseInt(fields.workDays);
    const workHours = Number.parseInt(fields.workHours);
    const workMinutes = Number.parseInt(fields.workMinutes);
    const minimumYear = 1970;
    const firstMonthDay = 1;
    const firstMonth = 1;
    const lastMonth = 12;
    const minimumMinutes = 0;
    const maximumMinutes = 59;
    const mimimumHours = 0;
    const maximumHours = 23;
    const minimumDays = 0;
    const maximumDays = 99;
    const months = [
      { name: 'January', days: [31] },
      { name: 'February', days: [28, 29] },
      { name: 'March', days: [31] },
      { name: 'April', days: [30] },
      { name: 'May', days: [31] },
      { name: 'June', days: [30] },
      { name: 'July', days: [31] },
      { name: 'August', days: [31] },
      { name: 'September', days: [30] },
      { name: 'October', days: [31] },
      { name: 'November', days: [30] },
      { name: 'December', days: [31] },
    ];

    if (dateYear > date.getFullYear() || dateYear < minimumYear) {
      // return false;
    }
    if (dateMonth < firstMonth || dateMonth > lastMonth) {
      // return false;
    }
    // declaring variables here ensures that month and year is valid before trying to pull a value from it
    const month = months[dateMonth - 1];
    const isLeapyear = dateYear % 4 === 0;
    const days = isLeapyear && month.days.length > 1 ? month.days[1] : month.days[0];

    if (dateDay < firstMonthDay || dateDay > days) {
      if (dateDay < firstMonthDay) throw new Error(`Date day must be at least ${firstMonthDay}`);
      if (dateDay > days) throw new Error(`"Day" must be at most ${days} for ${month.name}`);
    }
    if (finishMinutes < minimumMinutes || finishMinutes > maximumMinutes) {
      // return false;
    }
    if (finishHour < mimimumHours || finishHour > maximumHours) {
      // return false;
    }
    if (workMinutes < minimumMinutes || workMinutes > maximumMinutes) {
      // return false;
    }
    if (workHours < mimimumHours || workHours > maximumHours) {
      // return false;
    }
    if (workDays < minimumDays || workDays > maximumDays) {
      // return false;
    }
    // User didn't do any time no point in creating a log
    if (workDays === 0 && workHours === 0 && workMinutes === 0) {
      throw new Error("You aren't logging any time");
    }

    return fields;
  }

  type SetState = React.Dispatch<React.SetStateAction<string>>;
  function onChange(e: React.ChangeEvent<HTMLInputElement>, state: string, setState: SetState) {
    const numRegex = /^[0-9]+$/;
    const value = e.target.value;

    if (numRegex.test(value) || value === '') {
      if (state === '0') {
        value.length > 1 ? setState(value[1]) : setState(value);
      }
      else if (value === '') {
        setState('0');
      }
      else {
        setState(value);
      }
    }
  }

  return (
    <Overlay onClick={props.closeListener}>
      <form
        onSubmit={(e) => {
          try {
            e.preventDefault();
            checkFields();
            props.submitListener(e, fields);
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown Error';
            props.submitListener(e, message);
          }
        }}
        className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4"
      >
        <div>
          <label>Task Time</label>
          <div className='grid grid-cols-3 gap-x-1'>

            {/* days */}
            <div>
              <label htmlFor="days">Days</label>
              <input
                className='w-full text-black'
                type="number"
                name="days"
                id="days"
                min={0}
                step={1}
                value={workDays}
                onChange={e => onChange(e, workDays, setWorkDays)}
              />
            </div>

            {/* hours */}
            <div>
              <label htmlFor="hours">Hours</label>
              <input
                className='w-full text-black'
                type="number"
                name="hours"
                id="hours"
                max={23}
                min={0}
                step={1}
                value={workHours}
                autoComplete='off'
                onChange={e => onChange(e, workHours, setWorkHours)}
              />
            </div>

            {/* minutes */}
            <div>
              <label htmlFor="minutes">Minutes</label>
              <input
                className='w-full text-black'
                type="number"
                name="minutes"
                id="minutes"
                value={workMinutes}
                max={59}
                min={0}
                step={1}
                onChange={e => onChange(e, workMinutes, setWorkMinutes)}
              />
            </div>

          </div>
        </div>

        <div>

          <label>Date</label>
          <div className='grid grid-cols-3 gap-x-1'>

            {/* year */}
            <div>
              <label htmlFor="year">Year</label>
              <input
                className='w-full text-black'
                type="number"
                name="year"
                id="year"
                max={date.getFullYear()}
                min={1970}
                step={1}
                value={dateYear}
                onChange={e => onChange(e, dateYear, setDateYear)}
              />
            </div>

            {/* month */}
            <div>
              <label htmlFor="month">Month</label>
              <input
                className='w-full text-black'
                type="number"
                name="month"
                id="month"
                max={12}
                min={1}
                step={1}
                value={dateMonth}
                onChange={e => onChange(e, dateMonth, setDateMonth)}
              />
            </div>

            {/* day */}
            <div>
              <label htmlFor="day">Day</label>
              <input
                className='w-full text-black'
                type="number"
                name="day"
                id="day"
                max={31}
                min={1}
                step={1}
                value={dateDay}
                onChange={e => onChange(e, dateDay, setDateDay)}
              />
            </div>

          </div>
        </div>

        <div>
          <label>Time Finished</label>
          <div className='grid grid-cols-3 gap-x-1'>

            {/* Hour */}
            <div>
              <label htmlFor="finished_hour">Hour</label>
              <input
                className='w-full text-black'
                type="number"
                name="finished_hour"
                id="finished_hour"
                max={23}
                min={0}
                step={1}
                value={finishHour}
                onChange={e => onChange(e, finishHour, setFinishHour)}
              />
            </div>

            {/* minutes */}
            <div>
              <label htmlFor="finished_minutes">Minutes</label>
              <input
                className='w-full text-black'
                type="number"
                name="finished_minutes"
                id="finished_minutes"
                max={59}
                min={0}
                step={1}
                value={finishMinutes}
                onChange={e => onChange(e, finishMinutes, setFinishMinutes)}
              />
            </div>
          </div>
        </div>


        <div className="flex gap-x-2">
          <button className="w-full bg-blue-600 font-semibold p-2.5">
            {props.submitButtonText || 'Create'}
          </button>
          <button
            onClick={props.closeListener}
            className="w-full bg-pink-600 font-semibold p-2.5"
          >
            {props.cancelButtonText || 'Cancel'}
          </button>
        </div>
      </form>
    </Overlay>
  );
}
