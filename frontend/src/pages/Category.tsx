import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SpinnerIcon, ArrowLeft, EditIcon, TrashIcon } from '../components';

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
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [logs, setLogs] = useState<ILog[] | null>(null);

  useEffect(() => {
    axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}`)
      .then((res) => setCategory(res.data.results[0]))
      .catch(err => console.log(err));

    axios.get(`https://ilja-time-tracker.herokuapp.com/api/categories/${params.category}/logs`)
      .then((res) => setLogs(res.data.results))
      .catch(err => console.log(err));

  }, []);

  return (
    <div className='pt-4'>
      <button className='mb-8' onClick={() => navigate('/')}>
        <ArrowLeft className='ml-4' />
      </button>
      <div className="container mx-auto">
        <>
          {
            category ? <h1 className='text-8xl mb-12'>{category.title}</h1>
              : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
          }
          {
            logs ? (
              logs.map((log, index) => (
                <div className='flex justify-between bg-gray-600 py-2 px-4'>
                  <div>{log.time}</div>
                  <div>{log.finished_date}</div>
                  <div className='flex gap-x-2'>
                    <EditIcon />
                    <TrashIcon />
                  </div>
                </div>
              ))
            ) : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
            // logs ? logs.map((log, index) => (
            //     <div>{log.time}</div>
            //   ) : <SpinnerIcon className="border-gray-800 border-t-pink-600" />
          }
        </>
      </div>
    </div>
  );
}
