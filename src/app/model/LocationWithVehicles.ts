import {Vehicle} from './Vehicle';

export interface LocationWithVehicles {
  id?: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  email: string;
  vehicles?: Vehicle[];

}
