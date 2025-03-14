import {ArticleImage} from './ArticleImage';
import {UserDetails} from './UserDetails';
import {LocationWithVehicles} from './LocationWithVehicles';

export interface VehicleRequest {
  id?: string;
  mark?: string;
  model?: string;
  codeCar?: string;
  description?: string;
  telephone?: string;
  price?: number;
  type?: string;
  city?: string;
  fuelType?: string;
  year?: number;
  pricePerDay?: number;
  locationId?: number ;
}
