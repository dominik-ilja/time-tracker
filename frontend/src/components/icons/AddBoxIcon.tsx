interface props {
  className?: string;
  height?: string;
  onClick?: Function;
  size?: string;
  stroke?: string;
  width?: string;
}

export default function AddBoxIcon(props: props): JSX.Element {
  return (
    <svg
      className={props.className || undefined}
      fill="none"
      height={props.height || props.size || "28"}
      onClick={props.onClick ? (e) => props.onClick?.(e) : undefined}
      stroke={props.stroke || 'currentcolor'}
      viewBox="0 0 28 28"
      width={props.width || props.size || "28"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentcolor"
        // fill="white"
        d="M24.8889 0H3.11111C1.38444 0 0 1.4 0 3.11111V24.8889C0 26.6 1.38444 28 3.11111 28H24.8889C26.6 28 28 26.6 28 24.8889V3.11111C28 1.4 26.6 0 24.8889 0ZM21.7778 15.5556H15.5556V21.7778H12.4444V15.5556H6.22222V12.4444H12.4444V6.22222H15.5556V12.4444H21.7778V15.5556Z"
      />
    </svg>
  );
}
