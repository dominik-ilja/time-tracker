import React, { MouseEventHandler } from 'react';

interface IProps {
  className?: string;
  height?: string;
  onClick?: MouseEventHandler;
  size?: string;
  stroke?: string;
  width?: string;
}

export default function ShowLogsIcon(props: IProps) {
  return (
    <svg
      className={`h-full w-full ${props.className}`}
      fill="none"
      onClick={props.onClick ? props.onClick : undefined}
      stroke={props.stroke || 'currentcolor'}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V17C16 17.5304 15.7893 18.0391 15.4142 18.4142C15.0391 18.7893 14.5304 19 14 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H9"
      />
      <path
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 1H19V7"
      />
      <path
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12L19 1"
      />
    </svg>
  );
}
