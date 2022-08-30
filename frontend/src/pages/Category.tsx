import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SpinnerIcon, ArrowLeft, StatusPopup, DeleteMenu, Log, AddBox, LogMenu } from '../components';
import { ICategory, ILog, ILogFields } from '../types/interfaces';
import { constants, requests } from "../api";

export default function Category(): JSX.Element {
  const [category, setCategory] = useState<ICategory | null>(null);
  const [logs, setLogs] = useState<ILog[] | []>([]);
  const [activeLog, setActiveLog] = useState<ILog | null>(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [newLogAvailable, setNewLogAvailable] = useState(true);
  const [postMessage, setPostMessage] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  console.log(isPosting);


  function handleCreateMenuClick(state?: boolean): void {
    state === undefined
      ? setShowCreateMenu(prev => !prev)
      : setShowCreateMenu(state);
  }
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
  function handleEditMenuClick(state?: boolean, item?: ILog): void {
    if (state !== undefined) {
      setShowEditMenu(state);

      if (item !== undefined) {
        setActiveLog(item);
      }
    }
    else {
      setShowEditMenu(prev => !prev);
    }
  }
  function handleLogCreation(e: React.FormEvent, info: ILogFields | string): void {
    e.preventDefault();
    async function postLog() {
      setIsPosting(true);

      if (typeof info === 'string') {
        setPostMessage(info);
      }
      else if (category) {
        const data = await requests.postLog({
          category_id: category.id,
          finished_date: `${info.dateYear}-${info.dateMonth}-${info.dateDay} ${info.finishHour}:${info.finishMinutes}`,
          time: (Number.parseInt(info.workDays) * 1440)
            + (Number.parseInt(info.workHours) * 60)
            + Number.parseInt(info.workMinutes)
        });

        if (data) {
          setPostMessage('Log created!');
          setNewLogAvailable(true);
        }
        else {
          setPostMessage("Couldn't create log");
        }
      }

      setIsPosting(false);
      setHasPosted(true);
    }
    postLog();
  }
  function handleLogDeletion(item: ILog): void {
    axios.delete(`${constants.BASE_URL}/logs`, { data: { id: item.log_id } })
      .then(res => {
        setPostMessage('Log has been deleted!');
        setShowDeleteMenu(false);

        if (activeLog) {
          const updatedLogs = logs.filter(log => log.log_id !== item.log_id);
          setLogs(updatedLogs);
          setActiveLog(null);
        }
      })
      .catch(err => {
        setPostMessage("Couldn't delete log");
      })
      .finally(() => {
        setIsPosting(false);
        setHasPosted(true);
      });

    setIsPosting(true);
  }
  function handleLogEdit(e: React.FormEvent, info: ILogFields | string) {
    e.preventDefault();
    async function updateLog() {
      setIsPosting(true);

      console.log(info);

      if (typeof info === 'string') {
        console.log('here');
        setPostMessage(info);
      }
      else if (activeLog) {
        const data = await requests.updateLog({
          id: activeLog.log_id,
          finished_date: `${info.dateYear}-${info.dateMonth}-${info.dateDay} ${info.finishHour}:${info.finishMinutes}`,
          time: (Number.parseInt(info.workDays) * 1440)
            + (Number.parseInt(info.workHours) * 60)
            + Number.parseInt(info.workMinutes)
        });

        if (data) {
          setPostMessage('Log updated!');
          setNewLogAvailable(true);
        }
        else {
          setPostMessage("Couldn't update log");
        }

      }
      setIsPosting(false);
      setHasPosted(true);
    }
    updateLog();
  }

  useEffect(() => {
    axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}`)
      .then((res) => setCategory(res.data.results[0]))
      .catch(err => console.log(err));

    if (newLogAvailable) {
      setIsLoading(true);
      axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}/logs`)
        .then((res) => {
          console.log(res.data.results);
          setLogs(res.data.results);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
          setNewLogAvailable(false);
        });
    }

  }, [params.category, newLogAvailable]);
  useEffect(() => {
    if (hasPosted) {
      setTimeout(() => setHasPosted(false), 5000);
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
              !isLoading ? (
                logs.map(log => {
                  return log.log_id === null ? null : (
                    <Log
                      log={log}
                      deleteListener={() => handleDeleteMenuClick(true, log)}
                      editListener={() => handleEditMenuClick(true, log)}
                      key={log.category + log.category_id + log.log_id}
                    />
                  );
                })
              ) : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
            }
          </div>
          <AddBox onClick={() => handleCreateMenuClick(true)} />
        </>
      </div>

      {
        showCreateMenu && category && (
          <LogMenu
            closeListener={() => handleCreateMenuClick(false)}
            submitListener={handleLogCreation}
          />
        )
      }
      {
        showDeleteMenu && activeLog && (
          <DeleteMenu
            closeListener={() => handleDeleteMenuClick(false)}
            deleteListener={() => handleLogDeletion(activeLog)}
            text='Deleting removes the log. Would you like to delete the log?'
          />
        )
      }
      {
        showEditMenu && activeLog && (
          <LogMenu
            closeListener={() => handleEditMenuClick(false)}
            submitButtonText='Update'
            submitListener={handleLogEdit}
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
      {hasPosted && <StatusPopup>{postMessage}</StatusPopup>}
    </div>
  );
}
