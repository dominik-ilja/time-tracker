import React, { MouseEventHandler } from 'react';
import { EditIcon, TrashIcon, ShowLogsIcon } from './index';
import { useNavigate } from 'react-router-dom';
import { ICategoryTime } from '../types/interfaces';
import { numberToDays } from '../utils';

interface IProps {
  category: ICategoryTime;
  handleDeleteClick: MouseEventHandler;
  handleEditClick: MouseEventHandler;
}

export default function Category(props: IProps) {
  const navigate = useNavigate();
  const { category } = props;

  return (
    <div className="flex items-center justify-between bg-[#5E2CCA] pr-2">
      <div className="bg-[#541FC5] w-32 text-center p-3 font-semibold">{category.title}</div>
      <div>{category.total_time && numberToDays(category.total_time)}</div>
      <div className="text-[#AA83FC] flex gap-x-2">
        <button className='h-5' onClick={() => navigate(`/${category.title}`)}>
          <ShowLogsIcon />
        </button>
        <button className='h-5' onClick={props.handleEditClick}>
          <EditIcon />
        </button>
        <button className='h-5' onClick={props.handleDeleteClick}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
