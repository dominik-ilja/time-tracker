import { useEffect, useState } from "react";
import axios from "axios";
import { AddBoxIcon, Spinner } from "./components";

interface ICategory {
  id: number;
  title: string;
  total_time: number;
};
export default function App() {
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [postMessage, setPostMessage] = useState('');

  useEffect(() => {
    axios.get('https://ilja-time-tracker.herokuapp.com/api/categories')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch();
  });
  useEffect(() => {
    if (hasPosted) {
      setTimeout(() => setHasPosted(false), 2000);
    }
  }, [hasPosted]);

  function handleCreateMenuClick(state?: boolean): void {
    state === undefined
      ? setShowCreateMenu(prev => !prev)
      : setShowCreateMenu(state);
  }
  function handleCategoryCreation(e: React.FormEvent): void {
    e.preventDefault();
    console.log(inputText);
    const baseURL = 'https://ilja-time-tracker.herokuapp.com/api/';
    axios.post(baseURL + 'categories', { title: inputText, })
      .then(res => {
        console.log(res);
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage('Category created!');
        setInputText('');
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage("Couldn't create category");
      });
    setIsPosting(true);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div>
        {
          categories.map(category => (
            <div>{category.title}</div>
          ))
        }
        <AddBoxIcon
          className="cursor-pointer text-blue-500"
          onClick={() => handleCreateMenuClick(true)}
        />
      </div>

      {
        showCreateMenu && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div onClick={() => handleCreateMenuClick(false)}
              className="bg-gray-500 opacity-60 w-full h-full absolute -z-[1]" />

            {/* creation form */}
            <form onSubmit={handleCategoryCreation} className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label className="text-gray-400" htmlFor="category-title">Category Title</label>
                <input onChange={e => setInputText(e.target.value)} value={inputText} className="w-full text-black" type="text" name="name" id="category-title" />
              </div>
              <div className="flex gap-x-2">
                <button className="w-full bg-blue-600 font-semibold p-2.5">Create</button>
                <button
                  onClick={() => handleCreateMenuClick(false)}
                  className="w-full bg-pink-600 font-semibold p-2.5"
                >Cancel</button>
              </div>
            </form>
          </div>
        )
      }
      {
        isPosting && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 bg-gray-50 text-black font-semibold flex gap-x-2 min-w-[200px] min-h-[78px] justify-center items-center">
            Posting <Spinner className="border-gray-800 border-t-pink-600" />
          </div>
        )
      }
      {
        hasPosted && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 bg-gray-50 text-black font-semibold min-w-[200px] min-h-[78px] flex justify-center items-center">
            {postMessage}
          </div>
        )
      }
    </div>
  );
}
