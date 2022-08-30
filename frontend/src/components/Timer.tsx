import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ISubmitInfo } from '../types/interfaces';

interface IProps {
  submitHandler(e: React.MouseEvent, info: ISubmitInfo): any;
}

export default function Timer(props: IProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => setSeconds(prev => prev + 1), 1000);

      return () => clearInterval(id);
    }

  }, [isRunning]);

  function formatTimer() {
    const times = [3600, 60, 1];
    const maxTime = 359_999;
    let remainder = seconds;
    let result = '';

    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      const amount = Math.floor(remainder / time);
      remainder %= time;

      // adds zeros for formatting timer
      const digits = amount < 10 ? '0' + amount.toString() : amount.toString();

      // last loop don't add ":" between numbers
      if (i === times.length - 1) {
        result += digits;
      }
      else {
        result += digits + ':';
      }

    }

    return result;
  }


  return (
    <div className='flex flex-col items-center'>
      {/* category select */}

      {/* time */}
      <h1 className='text-8xl mb-6'>{formatTimer()}</h1>
      {/* buttons */}
      <div className='flex w-full mx-auto max-w-lg gap-x-4'>
        <button
          className="w-full border-2 border-emerald-500 text-emerald-500 font-semibold p-2.5 hover:bg-emerald-500 hover:text-emerald-900 transition-colors"
          onClick={() => setIsRunning(prev => !prev)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button className='w-full border-2 border-pink-600 text-pink-600 font-semibold p-2.5 hover:bg-pink-600 hover:text-pink-900 transition-colors'
          onClick={() => setSeconds(0)}>
          Reset
        </button>
        <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold p-2.5 hover:bg-blue-600 hover:text-blue-900 transition-colors"
          onClick={e => {
            const info = { submitTime: new Date(), seconds };
            props.submitHandler(e, info);
            setSeconds(0);
            setIsRunning(false);
          }}>
          Submit
        </button>
      </div>
    </div>
  );
}
