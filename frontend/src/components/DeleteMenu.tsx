import React, { MouseEventHandler } from 'react';
import { Overlay } from './index';

interface IProps {
  closeListener: MouseEventHandler,
  deleteListener: MouseEventHandler;
  text?: string;
}

export default function DeleteMenu(props: IProps) {
  return (
    <Overlay onClick={props.closeListener}>
      <div className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4">
        {props.text && <p className="text-center">{props.text}</p>}
        <div className="flex gap-x-2">
          <button
            onClick={props.deleteListener}
            className="w-full bg-pink-600 font-semibold p-2.5">Yes</button>
          <button
            onClick={props.closeListener}
            className="w-full border-white border-2 font-semibold p-2.5"
          >No</button>
        </div>
      </div>
    </Overlay>
  );
}
