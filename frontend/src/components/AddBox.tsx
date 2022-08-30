import React, { MouseEventHandler } from 'react';
import { AddBoxIcon } from './index';

interface IProps {
  onClick: MouseEventHandler;
}

export default function AddBox(props: IProps) {
  return (
    <div className="flex justify-center">
      <AddBoxIcon
        className="text-white cursor-pointer"
        onClick={props.onClick}
      />
    </div>
  );
}
