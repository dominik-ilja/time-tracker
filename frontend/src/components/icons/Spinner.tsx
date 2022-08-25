import './Spinner.scss';

interface IProps {
  borderColor?: string;
  borderWidth?: string;
  className?: string;
  spinnerColor?: string;
}

export default function Spinner(props: IProps): JSX.Element {
  return (
    <div className="flex justify-center">
      <div
        style={{
          borderColor: `${props.spinnerColor || props.borderColor} ${props.borderColor} ${props.borderColor}`,
          borderWidth: props.borderWidth,
        }}
        className={`spinner ${props.className || ''}`}
      ></div>
    </div>
  );
};
