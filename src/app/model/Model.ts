import {Mark} from './Mark';

export interface Model{
  id?: number;
  name?: string;
  mark?: Mark;
  createdAt?: string;
  updatedAt?: string | null;
}
