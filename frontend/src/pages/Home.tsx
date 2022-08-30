import { useEffect, useState } from "react";
import {
  SpinnerIcon, StatusPopup, DeleteMenu, CategoryMenu, AddBox, Category, Timer
} from "../components";
import { requests } from '../api';
import { ISubmitInfo, ICategoryTime } from '../types/interfaces';
import { formatLocalString } from '../utils';

export default function Home(): JSX.Element {
  const [categories, setCategories] = useState<ICategoryTime[] | []>([]);
  const [activeCategory, setActiveCategory] = useState<ICategoryTime | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [newPostAvailable, setNewPostAvailable] = useState(true);
  const [postMessage, setPostMessage] = useState('');


  useEffect(() => {
    async function getCategories() {
      if (newPostAvailable) {
        setIsLoading(true);
        const data = await requests.getCategories();
        data ? setCategories(data) : setCategories([]);
        setIsLoading(false);
        setNewPostAvailable(false);
      }
    };
    getCategories();

  }, [newPostAvailable]);
  useEffect(() => {
    if (hasPosted) {
      setTimeout(() => setHasPosted(false), 2000);
    }
  }, [hasPosted]);
  useEffect(() => {
    if (showDropdown) {
      window.addEventListener('click', () => {

      });
    }
  }, [showDropdown]);

  function handleCategoryCreation(e: React.FormEvent, title: { text: string; }) {
    async function postCategory() {
      setIsPosting(true);

      const data = await requests.postCategory({ title: title.text });

      if (data) {
        setPostMessage('Category created!');
        setNewPostAvailable(true);
      } else {
        setPostMessage("Couldn't create category");
      }

      setIsPosting(false);
      setHasPosted(true);
    }
    postCategory();
  }
  function handleCategoryDeletion() {
    async function deleteCategory() {
      setIsPosting(true);

      if (activeCategory) {
        await requests.deleteCategory({ data: { id: activeCategory.id } });
        const updatedCategories = categories.filter(category => category.id !== activeCategory.id);
        setPostMessage(`Category "${activeCategory && activeCategory.title}" has been deleted.`);
        setCategories(updatedCategories);
        setActiveCategory(null);
        setShowDeleteMenu(false);
      }
      else {
        setPostMessage("Couldn't delete category");
      }

      setIsPosting(false);
      setHasPosted(true);
    }
    deleteCategory();
  }
  function handleCategoryEdit(e: React.FormEvent, title: { text: string; }) {
    async function updateCategory() {
      setIsPosting(true);

      if (activeCategory) {
        const data = await requests.updateCategory({ new_title: title.text, id: activeCategory.id });

        if (data) {
          setPostMessage('Category updated!');
          setNewPostAvailable(true);
        } else {
          setPostMessage("Couldn't update category");
        }
      }

      setIsPosting(false);
      setHasPosted(true);
    }
    updateCategory();
  }
  function handleTimerSubmit(e: React.MouseEvent, info: ISubmitInfo) {
    async function createLog() {
      setIsPosting(true);

      if (activeCategory) {
        const time = Math.round(info.seconds / 60);

        if (time > 0) {
          const finished_date = formatLocalString(info.submitTime);
          const data = await requests.postLog({
            category_id: activeCategory.id,
            finished_date,
            time
          });

          if (data) {
            setPostMessage('Log created!');
            setNewPostAvailable(true);
          } else {
            setPostMessage("Couldn't create log");
          }
        }
        else {
          setPostMessage('Log has to be at least a minute');
        }
      }
      else {
        setPostMessage("Select a Category");
      }

      setIsPosting(false);
      setHasPosted(true);
    }
    createLog();
  }

  return (
    <div className="pt-4">
      <div className="container flex flex-col mx-auto gap-y-4">
        <div>
          <div className="relative flex justify-center py-2">
            <button onClick={() => setShowDropdown(prev => !prev)}
              className="text-center">
              {activeCategory?.title || categories[0]?.title || 'Select Category'}
            </button>
            {
              showDropdown && (
                <div className="absolute top-full bg-gray-500 w-full max-w-md flex flex-col items-center">
                  {
                    isLoading ? <SpinnerIcon className="border-gray-800 border-t-pink-600" />
                      : categories.map(category => (
                        <button
                          onClick={() => {
                            setActiveCategory(category);
                            setShowDropdown(false);
                          }}
                          className="w-full hover:bg-slate-800 py-4"
                        >
                          {category.title}
                        </button>
                      ))
                  }
                </div>
              )
            }
          </div>
          <Timer submitHandler={handleTimerSubmit} />
        </div>
        <div className="flex flex-col gap-y-1">
          {
            isLoading ? <SpinnerIcon className="border-gray-800 border-t-pink-600" />
              : categories.map(category => (
                <Category
                  category={category}
                  handleDeleteClick={() => {
                    setActiveCategory(category);
                    setShowDeleteMenu(true);
                  }}
                  handleEditClick={() => {
                    setActiveCategory(category);
                    setShowEditMenu(true);
                  }}
                  key={category.title + category.id}
                />
              ))
          }
        </div>
        <AddBox onClick={() => setShowCreateMenu(true)} />
      </div>

      {
        showCreateMenu && (
          <CategoryMenu
            closeListener={() => setShowCreateMenu(false)}
            submitListener={handleCategoryCreation}
            resetOnSubmit={true}
          />
        )
      }
      {
        showDeleteMenu && activeCategory && (
          <DeleteMenu
            closeListener={() => setShowDeleteMenu(false)}
            deleteListener={() => handleCategoryDeletion()}
            text={`Deleting removes the category and it's related data. Would you like to delete the 
                  "${activeCategory.title}" category?`}
          />
        )
      }
      {
        showEditMenu && activeCategory && (
          <CategoryMenu
            closeListener={() => setShowEditMenu(false)}
            submitListener={handleCategoryEdit}
            resetOnSubmit={true}
            submitButtonText='Update'
          />
        )
      }
      {
        isPosting && (
          <StatusPopup>
            <SpinnerIcon className="border-gray-800 border-t-pink-600" />
          </StatusPopup>
        )
      }
      {
        hasPosted && <StatusPopup>{postMessage}</StatusPopup>
      }
    </div>
  );
}
