import { FormEvent, MouseEventHandler, useState } from 'react';
import { Overlay } from './index';

interface IProps {
  closeListener: MouseEventHandler;
  submitListener(e: FormEvent, data: { text: string; }): any;
  resetOnSubmit?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export default function CategoryMenu(props: IProps): JSX.Element {
  const [inputText, setInputText] = useState('');

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    props.submitListener(e, { text: inputText });

    if (props.resetOnSubmit) setInputText('');
  }

  return (
    <Overlay onClick={props.closeListener}>
      <form onSubmit={handleFormSubmit} className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4">

        <div className="flex flex-col gap-y-2">
          <label className="text-gray-400" htmlFor="category-title">Category Title</label>
          <input onChange={e => setInputText(e.target.value)} value={inputText} className="w-full text-black" type="text" name="name" id="category-title" />
        </div>

        <div className="flex gap-x-2">
          <button type='submit' className="w-full bg-blue-600 font-semibold p-2.5">
            {props.submitButtonText || 'Create'}
          </button>

          <button
            onClick={props.closeListener}
            className="w-full bg-pink-600 font-semibold p-2.5"
          >
            {props.cancelButtonText || 'Cancel'}
          </button>
        </div>
      </form>
    </Overlay>
  );
}
