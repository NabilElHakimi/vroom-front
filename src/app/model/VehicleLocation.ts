import {Vehicle} from './Vehicle';

export interface VehicleLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  email: string;
  vehicles?: Vehicle[];

}
