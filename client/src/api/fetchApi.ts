import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Person } from '../PersonType';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const getAllUsers = async () => {
  const { data } = await instance.get('/items');
  return data;
};

export const getUser = async (id: number) => {
  const { data } = await instance.get(`/items/${id}`);
  return data;
};

export const createUser = async (user: Person) => {
  const { data } = await instance.post('/items', user);
  return data;
};

export const updateUser = async (id: number, user: Person) => {
  const { data } = await instance.put(`/items/${id}`, user);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await instance.delete(`/items/${id}`);
  return data;
};
