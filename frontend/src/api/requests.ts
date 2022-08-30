import axios from 'axios';
import { constants } from './index';
import { ICategoryTime } from '../types/interfaces';
const { BASE_URL } = constants;
const CATEGORIES = `${BASE_URL}/categories`;
const LOGS = `${BASE_URL}/logs`;



async function getCategories(): Promise<ICategoryTime[] | null> {
  try {
    const res = await axios.get(CATEGORIES);
    return res.data.results;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}
async function deleteCategory(info: { data: { id: number; }; }): Promise<string | null> {
  try {
    const res = await axios.delete(CATEGORIES, info);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function postCategory(category: { title: string; }): Promise<string | null> {
  try {
    const res = await axios.post(CATEGORIES, category);
    return res.data;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

interface IBaseCategory {
  new_title: string;
}
interface IPostCategoryId extends IBaseCategory {
  id: number;
  title?: never;
}
interface IPostCategoryTitle extends IBaseCategory {
  title: string;
  id?: never;
}
type PostCategory = IPostCategoryId | IPostCategoryTitle;
async function updateCategory(category: PostCategory): Promise<string | null> {
  try {
    const res = await axios.put(CATEGORIES, category);
    return res.data;
  } catch (error) {
    return null;
  }
}

interface IPostLog {
  category_id: number;
  finished_date: string;
  time: number;
}
async function postLog(log: IPostLog): Promise<string | null> {
  try {
    const res = await axios.post(LOGS, log);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
interface IUpdateLog {
  id: number;
  finished_date: string;
  time: number;
}
async function updateLog(log: IUpdateLog): Promise<string | null> {
  try {
    const res = await axios.put(LOGS, log);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const requests = {
  deleteCategory,
  getCategories,
  postCategory,
  postLog,
  updateCategory,
  updateLog,
};

export default requests;
