import React, { MouseEventHandler } from 'react';
import { ILog } from '../types/interfaces';
import { EditIcon, TrashIcon } from './index';
import { formatTime, numberToDays } from '../utils';

interface IProps {
  log: ILog;
  deleteListener: MouseEventHandler;
  editListener: MouseEventHandler;
}

export default function Log(props: IProps) {
  const { log } = props;

  return (
    <div className='flex justify-between px-4 py-2 bg-gray-600'>
      <div className='w-[115px]'>{numberToDays(log.time, { format: 'short', case: 'lowercase' })}</div>
      <div>{formatTime(log.finished_date)}</div>
      <div className='flex gap-x-2'>
        <button className='h-5' onClick={props.editListener}>
          <EditIcon />
        </button>
        <button className='h-5' onClick={props.deleteListener}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
