import {ArticleImage} from './ArticleImage';
import {UserDetails} from './UserDetails';
import {VehicleLocation} from './VehicleLocation';

export interface Vehicle {
  id: number;
  mark: string;
  model: string;
  codeCar: string;
  description: string;
  telephone: string;
  price: number;
  type: string;
  status: string;
  articleImages: ArticleImage[];
  userDetails: UserDetails;
  // likes: Likes[];
  city: string;
  mileage: number;
  fuelType: string;
  year: number;
  pricePerDay: number;
  isPublished: boolean;
  isArchived: boolean;
  // reservations: Reservation[];
  location: VehicleLocation;
  createdAt: string;
  updatedAt: string;

}
