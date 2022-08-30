import React from 'react';

interface IProps {
  children: any;
}

export default function StatusPopup(props: IProps): JSX.Element {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 bg-gray-50 text-black font-semibold min-w-[200px] min-h-[78px] flex justify-center items-center">
      {props.children}
    </div>
  );
}
