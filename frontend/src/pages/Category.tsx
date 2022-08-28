import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SpinnerIcon, ArrowLeft, EditIcon, TrashIcon, AddBoxIcon } from '../components';
import { dummyData, constants } from "../api";
import { formatTime, numberToDays } from '../utils';

interface ICategory {
  id: number;
  title: string;
}
interface ILog {
  category: string;
  category_id: number;
  finished_date: string;
  log_id: number;
  time: number;
}

export default function Category(): JSX.Element {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [logs, setLogs] = useState<ILog[] | []>([]);
  const [activeLog, setActiveLog] = useState<ILog | null>(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [newLogAvailable, setNewLogAvailable] = useState(true);
  const [postMessage, setPostMessage] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  console.log(activeLog);

  function handleDeleteMenuClick(state?: boolean, item?: ILog): void {
    if (state !== undefined) {
      setShowDeleteMenu(state);

      if (item !== undefined) {
        setActiveLog(item);
      }
    }
    else {
      setShowDeleteMenu(prev => !prev);
    }
  }
  function handleLogDeletion(item: ILog): void {
    axios.delete(`${constants.BASE_URL}/logs`, { data: { id: item.log_id } })
      .then(res => {
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage('Log has been deleted!');
        setShowDeleteMenu(false);

        if (activeLog) {
          const updatedLogs = logs.filter(log => log.log_id !== item.log_id);
          setLogs(updatedLogs);
          setActiveLog(null);
        }
      })
      .catch(err => {
        setIsPosting(false);
        setHasPosted(true);
        setPostMessage("Couldn't delete log");
      });

    setIsPosting(true);
  }

  useEffect(() => {
    // setCategory(dummyData.singleCategory.results[0]);
    axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}`)
      .then((res) => setCategory(res.data.results[0]))
      .catch(err => console.log(err));

    // setLogs(dummyData.categoryLogs.results);
    axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}/logs`)
      .then((res) => setLogs(res.data.results))
      .catch(err => console.log(err));

  }, [params.category]);
  useEffect(() => {
    if (hasPosted) {
      setTimeout(() => setHasPosted(false), 2000);
    }
  }, [hasPosted]);


  return (
    <div className='pt-4'>
      <button className='mb-8' onClick={() => navigate('/')}>
        <ArrowLeft className='ml-4' />
      </button>
      <div className="container mx-auto">
        <>
          {
            category ? <h1 className='mb-12 text-8xl'>{category.title}</h1>
              : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
          }
          <div className='mb-4'>
            {
              logs ? (
                logs.map((log, index) => {
                  if (log.log_id === null) {
                    return null;
                  }

                  return (
                    <div className='flex justify-between px-4 py-2 bg-gray-600'
                      key={log.category + log.category_id + log.log_id}
                    >
                      <div className='w-[115px]'>{numberToDays(log.time, { format: 'short', case: 'lowercase' })}</div>
                      <div>{formatTime(log.finished_date)}</div>
                      <div className='flex gap-x-2'>
                        <button>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteMenuClick(true, log)}>
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
            }
          </div>
          <div className="flex justify-center">
            <AddBoxIcon
              className="text-white cursor-pointer"
              onClick={() => { }}
            />
          </div>
        </>
      </div>
      {
        showDeleteMenu && (
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div onClick={() => handleDeleteMenuClick(false)}
              className="bg-gray-500 opacity-60 w-full h-full absolute -z-[1]" />

            {/* creation form */}
            <div className="bg-gray-600 p-6 max-w-xs min-w-[300px] flex flex-col gap-y-4">
              <p className="text-center">
                Deleting removes the log. Would you like to delete the log?
              </p>
              <div className="flex gap-x-2">
                <button onClick={() => activeLog && handleLogDeletion(activeLog)}
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
          <SpinnerIcon className="border-gray-800 border-t-pink-600" />
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
