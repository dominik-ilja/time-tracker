interface IProps {
  className?: string;
  height?: string;
  onClick?: Function;
  size?: string;
  stroke?: string;
  width?: string;
}

export default function ArrowLeft(props: IProps): JSX.Element {
  return (
    <svg
      className={props.className || undefined}
      fill="none"
      height={props.height || props.size || "34"}
      onClick={props.onClick ? (e) => props.onClick?.(e) : undefined}
      stroke={props.stroke || 'currentcolor'}
      viewBox="0 0 34 34"
      width={props.width || props.size || "34"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.9166 17H7.08325"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9999 26.9167L7.08325 17L16.9999 7.08334"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
