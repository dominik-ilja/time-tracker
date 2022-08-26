import { useEffect, useState } from "react";
import axios from "axios";
import { AddBoxIcon, EditIcon, SpinnerIcon, TrashIcon } from "../components";
import { numberToDays } from '../utils';

interface ICategory {
  id: number;
  title: string;
  total_time: number;
};

export default function Home(): JSX.Element {
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [newPostAvailable, setNewPostAvailable] = useState(true);
  const [postMessage, setPostMessage] = useState('');

  console.log(activeCategory);

  useEffect(() => {
    if (newPostAvailable) {
      axios.get('https://ilja-time-tracker.herokuapp.com/api/categories')
        .then((res) => {
          setCategories(res.data.results);
        })
        .catch(err => console.log(err));
      setNewPostAvailable(false);
    }
  }, [newPostAvailable]);
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
        setNewPostAvailable(true);
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage("Couldn't create category");
      });
    setIsPosting(true);
  }
  function handleDeleteMenuClick(state?: boolean, item?: ICategory): void {
    if (state !== undefined) {
      setShowDeleteMenu(state);

      if (item !== undefined) {
        setActiveCategory(item);
      }
    }
    else {
      setShowDeleteMenu(prev => !prev);
    }
  }
  function handleCategoryDeletion(item: ICategory): void {
    const baseURL = 'https://ilja-time-tracker.herokuapp.com/api/';

    axios.delete(baseURL + 'categories', { data: { id: item.id } })
      .then(res => {
        console.log(res);
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage(`Category "${activeCategory && activeCategory.title}" has been deleted.`);
        setShowDeleteMenu(false);
        if (activeCategory) {
          const updatedCategories = categories.filter(item => item.id !== activeCategory.id);
          setCategories(updatedCategories);
        }
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage("Couldn't delete category");
      });

    setIsPosting(true);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          {
            categories.map((category, index) => (
              <div className="flex items-center justify-between bg-[#5E2CCA] pr-2">
                <div className="bg-[#541FC5] w-32 text-center p-3 font-semibold">{category.title}</div>
                <div>{category.total_time && numberToDays(category.total_time)}</div>
                <div className="text-[#AA83FC] flex gap-x-2">
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <TrashIcon onClick={() => handleDeleteMenuClick(true, category)} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex justify-center">
          <AddBoxIcon
            className="cursor-pointer text-white"
            onClick={() => handleCreateMenuClick(true)}
          />
        </div>
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
        showDeleteMenu && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div onClick={() => handleDeleteMenuClick(false)}
              className="bg-gray-500 opacity-60 w-full h-full absolute -z-[1]" />

            {/* creation form */}
            <div className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4">
              <p className="text-center">
                Deleting removes the category
                and it's related data. Would you like to delete the "{activeCategory?.title}" category?
              </p>
              <div className="flex gap-x-2">
                <button onClick={() => activeCategory && handleCategoryDeletion(activeCategory)}
                  className="w-full bg-pink-600 font-semibold p-2.5">Yes</button>
                <button
                  onClick={() => handleDeleteMenuClick(false)}
                  className="w-full border-white border-2 font-semibold p-2.5"
                >No</button>
              </div>
            </div>
          </div>
        )
      }
      {
        isPosting && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 bg-gray-50 text-black font-semibold flex gap-x-2 min-w-[200px] min-h-[78px] justify-center items-center">
            <SpinnerIcon className="border-gray-800 border-t-pink-600" />
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