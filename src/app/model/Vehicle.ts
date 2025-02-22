import {ArticleImage} from './ArticleImage';
import {UserDetails} from './UserDetails';
import {Model} from './Model';

export interface Vehicle {
  id?: number;
  title?: string;
  description?: string;
  telephone?: string;
  price?: number;
  isPublished?: boolean;
  isArchived?: boolean;
  status?: string;
  articleImages?: ArticleImage[];
  userDetails?: UserDetails;
  likes?: any[];
  city?: string | null;
  model?: Model;
  createdAt?: string;
  updatedAt?: string | null;
  fuelType?: string;
  year?: string;
  mileage?: number;

}
