import React, { MouseEventHandler } from 'react';

interface IProps {
  children?: any;
  onClick?: MouseEventHandler;
}

export default function Overlay(props: IProps): JSX.Element {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div
        onClick={props.onClick}
        className="bg-gray-500 opacity-60 w-full h-full absolute -z-[1]"
      />
      {props.children}
    </div>
  );
}
