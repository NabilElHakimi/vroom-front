import {ArticleImage} from './ArticleImage';
import {UserDetails} from './UserDetails';
import {LocationWithVehicles} from './LocationWithVehicles';

export interface Vehicle {
  id?: number;
  mark?: string;
  model?: string;
  codeCar?: string;
  description?: string;
  telephone?: string;
  price?: number;
  type?: string;
  status?: string;
  articleImages?: ArticleImage[];
  userDetails?: UserDetails;
  // likes: Likes[];
  city?: string;
  mileage?: number;
  fuelType?: string;
  year?: number;
  pricePerDay?: number;
  isPublished?: boolean;
  isArchived?: boolean;
  // reservations: Reservation[];
  location?: LocationWithVehicles;
  createdAt?: string;
  updatedAt?: string;

}
